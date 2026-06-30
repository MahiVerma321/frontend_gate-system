import { AVATAR_THEMES } from "@/lib/employee";

export function getRandomAvatarTheme() {
  return AVATAR_THEMES[
    Math.floor(
      Math.random() *
      AVATAR_THEMES.length
    )
  ];
}