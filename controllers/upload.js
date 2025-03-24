const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.Upload = async (data, response) => {
    const required_keys = ["title", "author", "userId"];
    // title, author, url, description, comment
    const missing_keys = required_keys.filter((key) => !(key in data.body));
    if (missing_keys.length > 0) {
      return response.status(400).json({
        error: "Bad Request.",
        message: `Missing keys: ${missing_keys.join(", ")}`,
      });
    } else {
      try {
        const file = data.file;
        const description = data.body.description;
        if (!file) {
          return response.status(400).send("No file uploaded.");
        }
        
        // s3.upload(params, async (err, data) => {
        //   if (err) {
        //     log(logs_file_path, `Error uploading to S3: ${err}`);
        //     return response
        //       .status(500)
        //       .json({ status: false, error: `Error uploading to S3: ${err}` });
        //   }
        //   log(logs_file_path, `File uploaded to S3: ${data.Location}`);
          const new_document = await prisma.LawDocument.create({
            data: {
              document_description: description,
              document_link: key,
            },
          });
          log(logs_file_path, {
            status: true,
            location: data.Location,
            document: new_document,
          });
          return response.status(200).json({
            status: true,
            location: data.Location,
            document: new_document,
          });
        // });
        // const new_document = await prisma.LawDocument.create({
        //   data: {
        //     document_description: description,
        //     document_link: key
        //   }
        // });
        // log(logs_file_path, {status : true, location: data.Location, document: new_document});
        // return response.status(200).json({status : true, location: data.Location, document: new_document});
      } catch (error) {
        log(logs_file_path, `Error: ${error}`);
        response
          .status(500)
          .json({ status: false, error: "Internal server error" });
      } finally {
        await prisma.$disconnect();
      }
    }
};