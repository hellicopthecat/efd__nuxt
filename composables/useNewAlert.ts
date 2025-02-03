import type {IOnMessageDataType} from "~/types/message/messageType";

export default function () {
  return useState(() => ({} as IOnMessageDataType | null));
}
