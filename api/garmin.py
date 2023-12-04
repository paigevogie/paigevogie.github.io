import logging
from http.server import BaseHTTPRequestHandler
from json import dumps
from os import getenv
from dotenv import load_dotenv
from http.server import HTTPServer
from datetime import datetime, timedelta
from pytz import timezone
# https://github.com/cyberjunky/python-garminconnect
from garminconnect import (
    Garmin,
    GarminConnectConnectionError,
    GarminConnectTooManyRequestsError,
    GarminConnectAuthenticationError,
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

load_dotenv(".env")
load_dotenv(".env.local")


def getData():
  try:
    api = Garmin(getenv('GARMIN_USERNAME'), getenv('GARMIN_PASSWORD'))
    api.login()

    # pulling data for last three days
    i=0
    dates = []
    while i < 3:
      date = (datetime.now(timezone('US/Central')).date() - timedelta(days=i)).isoformat()
      dates.append(date)
      i+=1

    data = {}
    for date in dates:
      data[date] = api.get_stats_and_body(date)

    filteredData = {}
    for date in data:
      filteredData[date] = [{
        'totalSteps': data[date]['totalSteps'],
        'dailyStepGoal': data[date]['dailyStepGoal']
      }]

    sortedData = dict(sorted(
      filteredData.items(),
      key = lambda x:datetime.strptime(x[0], '%Y-%m-%d')
    ))

    return sortedData
  except (
    GarminConnectConnectionError,
    GarminConnectAuthenticationError,
    GarminConnectTooManyRequestsError,
  ) as err:
    logger.error('Error pulling todays data from garmin: %s', err)
    return None


class Handler(BaseHTTPRequestHandler):
  def do_SERVER_ERROR(self):
    self.send_response(500)
    self.send_header('Content-type', 'text/html')
    self.end_headers()
    self.wfile.write('Server Error'.encode())

  def do_GET(self):
    try:
      self.send_response(200)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(dumps(getData()).encode())
    except Exception as err:
      logger.error('Error on do_GET: %s', err)
      self.do_SERVER_ERROR()


# Testing serverless functions locally
def startServer(server_class=HTTPServer, handler_class=Handler, port=8008):
  server_address = ('', port)
  httpd = server_class(server_address, handler_class)

  print('Starting httpd on port', port)
  httpd.serve_forever()

# startServer()