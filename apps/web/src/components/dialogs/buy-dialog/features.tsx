/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2022 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Text, Flex, Box } from "@theme-ui/components";
import { isMacStoreApp } from "../../../utils/platform";
import {
  Accent,
  Android,
  Anonymous,
  Backup,
  Billboard,
  Cellphone,
  CellphoneLock,
  CheckCircleOutline,
  Chrome,
  CloudLock,
  EncryptedBackup,
  Export,
  FileCabinet,
  Firefox,
  Harddisk,
  Home,
  HTML,
  Icon,
  ImageMultiple,
  Ios,
  Linux,
  Markdown,
  Notebook2,
  Palette,
  PDF,
  Pin,
  Pro,
  Safari,
  ShieldLock,
  Shortcut,
  Table,
  Timebomb,
  Windows,
  Lock,
  MacOs,
  File,
  Embed,
  Text as TextIcon,
  ThemeIcon
} from "../../icons";

type Feature = {
  id: string;
  title?: string;
  icon?: Icon;
  pro?: boolean;
};

type Section = {
  title: string;
  detail: string;
  columns?: number;
  info?: string;
  pro?: boolean;
  features?: Feature[];
  isVisible?: () => boolean;
};

const sections: Section[] = [
  {
    title: "Focused on privacy",
    detail:
      "Everything you do in Notesnook stays private. We use XChaCha20-Poly1305-IETF and Argon2 to encrypt your notes.",
    features: [
      {
        id: "zero-ads",
        title: "Zero ads & zero trackers",
        icon: Billboard
      },
      {
        id: "on-device-encryption",
        title: "On device encryption",
        icon: Cellphone
      },
      {
        id: "secure-app-lock",
        title: "Secure app lock for all",
        icon: CellphoneLock
      },
      {
        id: "end-to-end-encrypted",
        title: "100% end-to-end encrypted",
        icon: Lock
      },
      {
        id: "private-vault",
        title: "Private vault for notes",
        icon: ShieldLock,
        pro: true
      }
    ]
  },
  {
    title: "Instant syncing",
    detail:
      "Seemlessly work from anywhere. Every change is synced instantly everywhere.",
    pro: true
  },
  {
    title: "100% cross platform",
    detail: "Notesnook is available on all major platforms — for everyone.",
    columns: 8,
    isVisible: () => !isMacStoreApp(),
    features: [
      {
        id: "ios",
        icon: Ios
      },
      {
        id: "android",
        icon: Android
      },
      {
        id: "windows",
        icon: Windows
      },
      {
        id: "linux",
        icon: Linux
      },
      {
        id: "macos",
        icon: MacOs
      },
      {
        id: "chrome",
        icon: Chrome
      },
      {
        id: "firefox",
        icon: Firefox
      },
      {
        id: "safari",
        icon: Safari
      }
    ]
  },
  {
    title: "Attach files & images",
    detail:
      "Add your documents, PDFs, images and videos, and keep them safe and organized.",
    pro: true,
    features: [
      {
        id: "bulletproof-encryption",
        title: "Bulletproof encryption",
        icon: Lock
      },
      {
        id: "4k-images",
        title: "High quality 4K images",
        icon: ImageMultiple
      },
      {
        id: "unlimited-storage",
        title: "Unlimited storage",
        icon: Harddisk
      },
      {
        id: "500-mb-files",
        title: "Upto 500 MB per file",
        icon: FileCabinet
      },
      {
        id: "file-types",
        title: "All file types supported",
        icon: File
      }
    ]
  },
  {
    title: "No limit on notes",
    detail:
      "We don't have nonsense like blocks and whatnot. You can create as many notes as you want — no limits."
  },
  {
    title: "Safe publishing to the Internet",
    detail:
      "Publishing is nothing new but we offer fully encrypted, anonymous publishing. Take any note & share it with the world.",
    features: [
      {
        id: "anon-publishing",
        title: "Anonymous publishing",
        icon: Anonymous
      },
      {
        id: "password-protected-publishing",
        title: "Password protection",
        icon: CloudLock
      },
      {
        id: "self-destructive-notes",
        title: "Self destructable notes",
        icon: Timebomb
      }
    ]
  },
  {
    title: "Organize yourself in the best way",
    detail:
      "We offer multiple ways to keep you organized. The only limit is your imagination.",
    features: [
      {
        id: "unlimited-notebooks",
        title: "Unlimited notebooks*",
        icon: Notebook2,
        pro: true
      },
      {
        id: "colors-tags",
        title: "Colors & tags*",
        icon: Palette,
        pro: true
      },
      {
        id: "side-menu-shortcuts",
        title: "Side menu shortcuts",
        icon: Shortcut
      },
      {
        id: "pins-favorites",
        title: "Pins & favorites",
        icon: Pin
      }
    ],
    info: "* Free users can only create 3 notebooks (no limit on topics) and 5 tags."
  },

  {
    title: "Rich tools for rich editing",
    detail:
      "Having the right tool at the right time is crucial for note taking. Lists, tables, codeblocks — you name it, we have it.",
    pro: true,
    features: [
      {
        id: "lists-tables",
        title: "Lists & tables",
        icon: Table
      },
      {
        id: "image-embeds",
        title: "Images & embeds",
        icon: Embed
      },
      {
        id: "checklists",
        title: "Checklists",
        icon: CheckCircleOutline
      },
      {
        id: "md-shortcuts",
        title: "Markdown shortcuts",
        icon: Markdown
      }
    ]
  },
  {
    title: "Export and take your notes anywhere",
    detail:
      "You own your notes, not us. No proprietary formats. No vendor lock in. No waiting for hours to download your notes.",
    // info: "* Free users can export notes in well formatted plain text.",
    features: [
      {
        id: "export-markdown",
        title: "Export as Markdown",
        icon: Markdown,
        pro: true
      },
      {
        id: "export-pdf",
        title: "Export as PDF",
        icon: PDF,
        pro: true
      },
      {
        id: "export-html",
        title: "Export as HTML",
        icon: HTML,
        pro: true
      },
      {
        id: "export-txt",
        title: "Export as text",
        icon: TextIcon
      },
      {
        id: "bulk-exports",
        title: "Bulk exports",
        icon: Export
      }
    ]
  },
  {
    title: "Backup & keep your notes safe",
    detail:
      "Do not worry about losing your data. Turn on automatic backups on weekly or daily basis.",
    features: [
      {
        id: "auto-backups",
        title: "Automatic monthly, weekly & daily backups",
        icon: Backup,
        pro: true
      },
      {
        id: "backup-encryption",
        title: "Backup encryption",
        icon: EncryptedBackup,
        pro: true
      }
    ]
  },
  {
    title: "Personalize & make Notesnook your own",
    detail:
      "Change app themes to match your style. Custom themes are coming soon.",
    pro: true,
    features: [
      {
        id: "10-themes",
        title: "10+ themes",
        icon: Accent
      },
      {
        id: "dark-mode",
        title: "Automatic dark mode",
        icon: ThemeIcon
      },
      {
        id: "default-home-page",
        title: "Change default home page",
        icon: Home
      }
    ]
  }
];

export function Features() {
  return (
    <Flex
      sx={{
        position: "relative",
        flex: 1,
        flexDirection: "column",
        flexShrink: 0,
        overflowY: ["hidden", "hidden", "auto"]
      }}
      pt={6}
      bg="background"
    >
      {sections.map((section) => {
        if (section.isVisible && !section.isVisible()) return null;

        return (
          <Flex
            key={section.title}
            px={6}
            pb={50}
            sx={{ flexDirection: "column" }}
          >
            {section.pro && (
              <Flex
                bg="bgSecondary"
                px={2}
                py="2px"
                sx={{ borderRadius: 50, alignSelf: "start" }}
                mb={1}
              >
                <Pro color="primary" size={16} />
                <Text variant="body" ml={"2px"} sx={{ color: "primary" }}>
                  Pro
                </Text>
              </Flex>
            )}
            <Text variant="body" sx={{ fontSize: "1.3rem" }}>
              {section.title}
            </Text>
            <Text
              variant="body"
              mt={1}
              sx={{ fontSize: "title", color: "fontTertiary" }}
            >
              {section.detail}
            </Text>
            {section.features && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: section.columns
                    ? "1fr ".repeat(section.columns)
                    : "1fr 1fr 1fr",
                  gap: 3
                }}
                mt={4}
              >
                {section.features.map((feature) => (
                  <Flex
                    key={feature.id}
                    sx={{ flexDirection: "column", alignItems: "start" }}
                  >
                    {feature.icon && (
                      <feature.icon size={20} color="text" sx={{ mb: 1 }} />
                    )}
                    {feature.pro && (
                      <Flex
                        sx={{ alignItems: "center", justifyContent: "center" }}
                      >
                        <Pro color="primary" size={14} />
                        <Text
                          variant="subBody"
                          ml={"2px"}
                          sx={{ color: "primary" }}
                        >
                          Pro
                        </Text>
                      </Flex>
                    )}
                    {feature.title && (
                      <Text variant="body" sx={{ fontSize: "subtitle" }}>
                        {feature.title}
                      </Text>
                    )}
                  </Flex>
                ))}
              </Box>
            )}
            {section.info && (
              <Text mt={1} variant="subBody">
                {section.info}
              </Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
