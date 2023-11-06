const LinkedIn = ({ linkedInData }) => (
  <div
    className="linkedin-embed"
    data-locale="en_US"
    data-size="large"
    data-theme="light"
    data-type="VERTICAL"
    data-vanity="paigevogie"
    data-version="v1"
    dangerouslySetInnerHTML={{ __html: linkedInData }}
  />
);

export default LinkedIn;
