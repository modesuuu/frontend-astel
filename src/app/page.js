import { ROUTES } from "@/constants/routes.js";
import Image from "next/image";
import { redirect } from "next/navigation.js";

export default function Home() {
  redirect(ROUTES.LOGIN);
}
