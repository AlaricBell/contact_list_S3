import { ContactType } from "@/modules/contact/types/ContactType";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createContact = async (contact: ContactType) => {
	try {
		await prisma.contacts.create({
			data: {
				name: contact.name,
				phone: contact.phone,
				email: contact.email,
				avatar: contact.avatar,
			},
		});
	} catch (e) {
		return Response.json({
			status: 400,
			error: `A descriptive message why upload went wrong: ${e}`,
		});
	} finally {
		await prisma.$disconnect();
	}
};

const updateContact = async (id: string, contact: ContactType) => {
	try {
		if (contact.avatar !== "") {
			await prisma.contacts.update({
				where: { id },
				data: {
					name: contact.name,
					phone: contact.phone,
					email: contact.email,
					avatar: contact.avatar,
				},
			});
		} else {
			await prisma.contacts.update({
				where: { id },
				data: {
					name: contact.name,
					phone: contact.phone,
					email: contact.email,
				},
			});
		}
	} catch (e) {
		return Response.json({
			status: 400,
			error: "A descriptive message why update went wrong",
		});
	} finally {
		await prisma.$disconnect();
	}
};

export async function GET(request: Request) {
	try {
		const contacts = await prisma.contacts.findMany();
		return Response.json({ status: 200, data: contacts });
	} catch (e) {
		return Response.json({
			status: 400,
			data: [
				{
					id: "1",
					name: "errorName",
					phone: "errorphone",
					email: "email",
					createdAt: "",
					updatedAt: "",
					avatar: "/images/avatars/Default.svg",
				},
			],
			error: e,
		});
	}
}

export async function POST(request: Request) {
	const data = await request.formData();
	const image: File | null = data.get("image") as unknown as File; // Enforce File type
	const name: string = data.get("name") as string;
	const phone: string = data.get("phone") as string;
	const email: string = data.get("email") as string;

	if (!image) {
		const imageUrl = "/images/avatars/Default.svg";
		const response = await createContact({
			id: null,
			createdAt: null,
			updatedAt: null,
			name,
			phone,
			email,
			avatar: imageUrl,
		});
		return Response.json({ status: 200, data: response });
	}

	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const fileKey = `avatars/${Date.now()}_${image.name}`;

	const s3Client = new S3Client({
		region: process.env.AWS_REGION ?? "",
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
		},
	});

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_CONTACT_BUCKET_NAME ?? "",
		Key: fileKey,
		Body: buffer,
	});

	try {
		await s3Client.send(command);
	} catch (e) {
		return Response.json({
			status: 400,
			error: "A descriptive message why image upload went wrong",
		});
	}

	const imageUrl = `https://${process.env.AWS_CONTACT_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
	const response = await createContact({
		id: null,
		createdAt: null,
		updatedAt: null,
		name,
		phone,
		email,
		avatar: imageUrl,
	});
	return Response.json({ status: 200, data: response });
}

export async function PUT(request: Request) {
	const data = await request.formData();
	const image: File | null = data.get("image") as unknown as File; // Enforce File type
	const name: string = data.get("name") as string;
	const phone: string = data.get("phone") as string;
	const email: string = data.get("email") as string;
	const id: string = data.get("id") as string;

	if (!image || typeof image === "string") {
		const response = await updateContact(id, {
			id: null,
			createdAt: null,
			updatedAt: null,
			name,
			phone,
			email,
			avatar: image ?? "/images/avatars/Default.svg",
		});
		return Response.json({ status: 200, data: response });
	}

	const bytes = await image.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const fileKey = `avatars/${Date.now()}_${image.name}`;

	const s3Client = new S3Client({
		region: process.env.AWS_REGION ?? "",
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
		},
	});

	const command = new PutObjectCommand({
		Bucket: process.env.AWS_CONTACT_BUCKET_NAME ?? "",
		Key: fileKey,
		Body: buffer,
	});

	try {
		await s3Client.send(command);
	} catch (e) {
		return Response.json({
			status: 400,
			error: "A descriptive message why image upload went wrong",
		});
	}
	const imageUrl = `https://${process.env.AWS_CONTACT_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
	const response = await updateContact(id, {
		id: null,
		createdAt: null,
		updatedAt: null,
		name,
		phone,
		email,
		avatar: imageUrl,
	});
	return Response.json({ status: 200, data: response });
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return Response.json({
			status: 400,
			error: "A descriptive message why deletion went wrong",
		});
	}

	try {
		await prisma.contacts.delete({
			where: {
				id,
			},
		});
	} catch (e) {
		console.error("Error deleting contact:", e);
		return Response.json({ status: 400, error: e });
	} finally {
		await prisma.$disconnect();
		return Response.json({ status: 200 });
	}
}
