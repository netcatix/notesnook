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

import React from "react";
import { useNoteStore } from "../../stores/use-notes-store";
import { useThemeStore } from "../../stores/use-theme-store";
import { AnnouncementDialog } from "../announcements";
import { AttachmentDialog } from "../attachments";
import AuthModal from "../auth/auth-modal";
import { SessionExpired } from "../auth/session-expired";
import { Dialog } from "../dialog";
import { AddTopicDialog } from "../dialogs/add-topic";
import ResultDialog from "../dialogs/result";
import { VaultDialog } from "../dialogs/vault";
import ImagePreview from "../image-preview";
import MergeConflicts from "../merge-conflicts";
import PremiumDialog from "../premium";
import { Expiring } from "../premium/expiring";
import SheetProvider from "../sheet-provider";
import { AddNotebookSheet } from "../sheets/add-notebook";
import AddToNotebookSheet from "../sheets/add-to";
import ManageTagsSheet from "../sheets/manage-tags";
import PublishNoteSheet from "../sheets/publish-note";
import RateAppSheet from "../sheets/rate-app";
import RecoveryKeySheet from "../sheets/recovery-key";
import RestoreDataSheet from "../sheets/restore-data";

const DialogProvider = () => {
  const colors = useThemeStore((state) => state.colors);
  const loading = useNoteStore((state) => state.loading);

  return (
    <>
      <Dialog context="global" />
      <AddTopicDialog colors={colors} />
      <AddNotebookSheet colors={colors} />
      <PremiumDialog colors={colors} />
      <AuthModal colors={colors} />
      <MergeConflicts />
      <RecoveryKeySheet colors={colors} />
      <SheetProvider />
      <SheetProvider context="sync_progress" />
      <RestoreDataSheet />
      <ResultDialog />
      <VaultDialog colors={colors} />
      <AddToNotebookSheet colors={colors} />
      <RateAppSheet />
      <ImagePreview />
      <PublishNoteSheet />
      <ManageTagsSheet />
      <AttachmentDialog />
      {loading ? null : <Expiring />}
      <AnnouncementDialog />
      <SessionExpired />
    </>
  );
};

export default React.memo(DialogProvider, () => true);
