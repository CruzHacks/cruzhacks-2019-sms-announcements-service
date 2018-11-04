const AWS = require("aws-sdk");
const fs = require("fs");

// For dev purposes only
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// Read in the file, convert it to base64, store to S3

// eslint-disable-next-line prettier/prettier
const resumeName = "Kyle\ O\'Brien\ Resume.pdf";

fs.readFile(resumeName, (fileSystemError, data) => {
  if (fileSystemError) {
    throw fileSystemError;
  }

  // eslint-disable-next-line no-buffer-constructor
  const base64data = new Buffer(data, "binary");

  const s3 = new AWS.S3();
  const hackerName = "Kyle O'Brien";
  const formattedName = hackerName.replace(" ", "_").toLowerCase();

  s3.putObject(
    {
      Bucket: `cruzhacks-2019-hackers/${formattedName}/resume/`,
      Key: resumeName,
      Body: base64data,
      ACL: "aws-exec-read",
      ServerSideEncryption: "AES256",
      Tagging: "type=resume&year=cruzhacks2019"
    },
    resp => {
      console.log(resp);
      console.log("Successfully uploaded package.");
    }
  );
});

