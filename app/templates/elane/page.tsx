import type { Metadata } from "next";
import ElaneClientPage from "./ElaneClientPage";

export const metadata: Metadata = {
  title: "ÉLANÉ — أزياء",
  description: "قالب أزياء فاخر هادئ بطابع تحريري من NexoraStudio.",
};

export default function ElanePage() {
  return <ElaneClientPage />;
}
