import Button from "./ui/Button";
import { useLocalization } from "../hooks/useLocalization";

const DeleteCompletedButton = ({ hasCompletedTodos, onClick }) => {
  const { t } = useLocalization();

  if (!hasCompletedTodos) return null;

  return (
    <Button
      onClick={onClick}
      variant="dangerSoft"
      size="md"
      className="motion-fade-up motion-delay-4 mt-5 w-full self-center justify-center sm:w-auto"
    >
      {t("deleteCompleted.clear")}
    </Button>
  );
};

export default DeleteCompletedButton;
