import { mauve, blue } from "@radix-ui/colors";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FP check in",
    short_name: "FP check in",
    description: "Use Fitness Passport to check into fitness facilities",
    start_url: "/",
    display: "standalone",
    background_color: mauve.mauve1,
    theme_color: blue.blue10,
    icons: [
      //   {
      //     src: "/icon-192x192.png",
      //     sizes: "192x192",
      //     type: "image/png",
      //   },
      //   {
      //     src: "/icon-512x512.png",
      //     sizes: "512x512",
      //     type: "image/png",
      //   },
    ],
  };
}
