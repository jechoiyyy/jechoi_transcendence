import useAnimationLoop from '@hooks/controller/useAnimationLoop';
import { useInput } from '@contexts/InputContext';

export default function HomeController({
  isProfileModalOpen,
  isCreateRoomModalOpen,
  closeProfileModal,
  closeCreateRoomModal,
}) {
  const keys = useInput();

  useAnimationLoop(() => {
    if (!keys.current.Escape) return;

    if (isCreateRoomModalOpen) {
      closeCreateRoomModal();
      return;
    }

    if (isProfileModalOpen) {
      closeProfileModal();
      return;
    }
  });

  return null;
}
