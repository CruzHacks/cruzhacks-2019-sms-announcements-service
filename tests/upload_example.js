const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: "AKIAIOSAT4F4HDM332CA",
  secretAccessKey: "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"
});

// Read in the file, convert it to base64, store to S3

// eslint-disable-next-line prettier/prettier
const resumeName = "Kyle\ O\'Brien\ Resume.pdf";

fs.readFile(resumeName, (fileSystemerroror, data) => {
  if (fileSystemerroror) {
    throw fileSystemerroror;
  }

  // eslint-disable-next-line no-buffer-constructor
  const base64data = new Buffer(data, "binary");

  const s3 = new AWS.S3();
  const hackerName = "Kyle O'Brien";
  const formattedName = hackerName.replace(" ", "_").toLowerCase();

  s3.upload(
    {
      Bucket: `cruzhacks-2019-hackers/${formattedName}/resume`,
      Key: resumeName,
      Body: base64data,
      ACL: "aws-exec-read",
      ServerSideEncryption: "AES256",
      Tagging: "type=resume&year=cruzhacks2019"
    },
    (error, response) => {
      if (error) {
        console.log("erroror Uploading To S3");
        console.log(error);
      } else {
        //   Prints location in S3
        console.log(response.Location);
        console.log("Successfully uploaded package.");
      }
    }
  );
});
