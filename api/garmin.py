import logging
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
from os import getenv
from urllib.parse import parse_qs, urlparse

from dotenv import load_dotenv
# https://github.com/cyberjunky/python-garminconnect
from garminconnect import Garmin
from pytz import timezone

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

load_dotenv(".env")
load_dotenv(".env.local")


class Handler(BaseHTTPRequestHandler):
  def do_GET(self):
    try:
      api = Garmin(getenv('GARMIN_USERNAME'), getenv('GARMIN_PASSWORD'))
      api.login()

      # pull data for last X days
      i=0
      dates = []
      days = 3
      query = parse_qs(urlparse(self.path).query)
      if "days" in query:
        days = int(query['days'][0])
      while i < days:
        date = (datetime.now(timezone('US/Central')).date() - timedelta(days=i)).isoformat()
        dates.append(date)
        i+=1

      data = {}
      for date in dates:
        data[date] = api.get_stats_and_body(date)

      filtered_data = {}
      for date in data:
        filtered_data[date] = [{
          'totalSteps': data[date]['totalSteps'],
          'dailyStepGoal': data[date]['dailyStepGoal'],
          'moderateIntensityMinutes': data[date]['moderateIntensityMinutes'],
          'vigorousIntensityMinutes': data[date]['vigorousIntensityMinutes'],
          'intensityMinutesGoal': data[date]['intensityMinutesGoal']
        }]

      # sort by most recent date
      sorted_data = dict(sorted(
        filtered_data.items(),
        key = lambda x:datetime.strptime(x[0], '%Y-%m-%d'),
        reverse=True
      ))
      
      self.send_response(200)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(dumps(sorted_data).encode())
    except Exception as err:
      logger.error('Error on do_GET: %s', err)
      self.send_response(500)
      self.send_header('Content-type', 'text/html')
      self.end_headers()
      self.wfile.write('Server Error'.encode())