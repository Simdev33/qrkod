import { notFound } from "next/navigation";

// Minden ismeretlen /<nyelv>/… cím a nyelvhez illő 404-oldalt kapja.
export default function CatchAll() {
  notFound();
}
