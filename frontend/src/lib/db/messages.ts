import { readJsonFile, writeJsonFile } from "./json-store";

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const FILE = "messages.json";

export async function getAllMessages(): Promise<Message[]> {
  const messages = await readJsonFile<Message[]>(FILE, []);
  return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createMessage(data: Omit<Message, "id" | "isRead" | "createdAt">): Promise<Message> {
  const messages = await readJsonFile<Message[]>(FILE, []);
  const newId = messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
  const newMessage: Message = {
    ...data,
    id: newId,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(newMessage);
  await writeJsonFile(FILE, messages);
  return newMessage;
}

export async function toggleMessageRead(id: number): Promise<Message> {
  const messages = await readJsonFile<Message[]>(FILE, []);
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) {
    throw new Error(`Message with ID ${id} not found`);
  }
  messages[index].isRead = !messages[index].isRead;
  await writeJsonFile(FILE, messages);
  return messages[index];
}

export async function deleteMessage(id: number): Promise<void> {
  const messages = await readJsonFile<Message[]>(FILE, []);
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length === messages.length) {
    throw new Error(`Message with ID ${id} not found`);
  }
  await writeJsonFile(FILE, filtered);
}
