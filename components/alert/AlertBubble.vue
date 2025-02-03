<script setup lang="ts">
interface IDBResultsTypes {
  id: number;
  title: string;
  desc: string;
  roomID: string;
}
const {$getAllDB, $deleteData, $getAlertState, $editAlertState} = useNuxtApp();
const router = useRouter();
const OFFER = "OFFER";
const BADGE = "BADGE";
const badge = ref(false);
const open = ref(false);
const alerts = ref<IDBResultsTypes[]>();
const incomeAlert = useNewAlert();

// Fns
const openBubble = async () => {
  open.value = !open.value;
  if (open.value) {
    const db = (await $getAllDB(OFFER, 1)) as IDBResultsTypes[];
    await $editAlertState(BADGE, 1, 1, "false");
    alerts.value = db;
  }
  badge.value = false;
};
const deleteAlerts = async (id: number) => {
  await $deleteData(OFFER, 1, id);
  alerts.value = alerts.value?.filter((target) => target.id !== id);
};
const goToChatRoom = (roomId: string) => {
  router.push(`/chatting/${roomId}`);
};
onMounted(async () => {
  const db = (await $getAllDB(OFFER, 1)) as IDBResultsTypes[];
  const alertState = (await $getAlertState(BADGE, 1, 1)) as {
    id: number;
    alert: string;
  };
  if (alertState.alert === "true") {
    badge.value = true;
  } else {
    badge.value = false;
  }
  alerts.value = db;
});
watch(incomeAlert, async () => {
  const db = (await $getAllDB(OFFER, 1)) as IDBResultsTypes[];
  await $editAlertState(BADGE, 1, 1, "true");
  alerts.value = db;
  badge.value = true;
});
</script>
<template>
  <div>
    <ul
      class="absolute z-[80] xl:bottom-20 left-48 xl:left-2 2xl:left-8 flex flex-col gap-3 bg-warnYellow p-5 rounded-md text-darkBlue origin-top xl:origin-bottom transition-all duration-500 ease-in-out overflow-y-auto"
      :class="open ? 'h-52 scale-y-100' : 'h-0 scale-y-0'"
    >
      <li v-if="alerts?.length! <= 0">알림이 없습니다.</li>
      <li
        v-else
        v-for="alert in alerts"
        class="flex items-center gap-3 bg-yellow-400 p-3 rounded-md"
        :key="alert.id"
      >
        <button @click="goToChatRoom(alert.roomID)">
          {{ alert.desc }}
        </button>
        <button
          @click="deleteAlerts(alert.id)"
          class="flex justify-center items-center hover:bg-yellow-500 size-8"
        >
          <Icon name="mdi:delete-forever" class="size-5" />
        </button>
      </li>
    </ul>

    <div class="relative">
      <button
        @click="openBubble"
        class="relative bg-warnYellow flex flex-col justify-center items-center p-2 origin-bottom-right transition-all ease-in-out duration-500 rounded-full"
      >
        <div
          class="absolute bg-warnYellow hover:animate-ping size-full rounded-full"
        />
        <Icon name="mdi:bell" class="size-5 text-darkBlue" />
      </button>
      <div
        v-if="badge"
        class="absolute top-0 right-0 size-3 rounded-full bg-red-500"
      />
    </div>
  </div>
</template>
