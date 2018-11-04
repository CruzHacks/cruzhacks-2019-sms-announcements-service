const AWS = require("aws-sdk");
const fs = require("fs");

// For dev purposes only
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Read in the file, convert it to base64, store to S3

const resumeName = "Kyle O 'Brien Resume.pdf";

fs.readFile(resumeName, (err, data) => {
  if (err) {
    throw err;
  }

  // eslint-disable-next-line no-buffer-constructor
  const base64data = new Buffer(data, "binary");
  const name = "Kyle O'Brien";
  const s3 = new AWS.S3();

  s3.client.putObject(
    {
      Bucket: `2019-hackers/resumes/${name.replace(" ", "_").toLowerCase()}`,
      Key: resumeName,
      Body: base64data,
      ACL: "public-read"
    },
    resp => {
      console.log(resp);
      console.log("Successfully uploaded package.");
    }
  );
});
