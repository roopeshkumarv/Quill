"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ChatProps {
  viewerName: string;
  hostId: string;
  hostName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostId,
  viewerName,
  isFollowing,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const hidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      Chat
      <div></div>
    </div>
  );
};