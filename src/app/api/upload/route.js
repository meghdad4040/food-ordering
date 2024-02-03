import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const ACCESSKEY = process.env.LIARA_ACCESS_KEY
const SECRETKEY = process.env.LIARA_SECRET_KEY
const ENDPOINT = process.env.LIARA_ENDPOINT
const BUCKET = process.env.LIARA_BUCKET_NAME


export const POST = async req => {

  const data = await req.formData();

  if (data.get("file")) {
    //upload the file
    const file = data.get('file');

    const client = new S3Client({
      endpoint: ENDPOINT,
      region: "default",
      credentials: {
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
      },
    });

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    try {
      await client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: newFileName,
        ContentType: file.type,
        Body: buffer
      }));
    } catch (error) {
      console.log(error)
    }

    const params = {
      Bucket: BUCKET,
      Key: newFileName
    };

    try {
      const command = new GetObjectCommand(params);
      const globalUrl = await getSignedUrl(client, command);
      console.log("url:", globalUrl);
      return Response.json(globalUrl);
    } catch (error) {
      console.error("Error occurred:", error);
      return Response.json({ error: "Failed to generate signed URL" }, { status: 500 });
    }
  }

  return Response.json(true);

}


