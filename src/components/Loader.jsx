import { useLocalization } from "../hooks/useLocalization";

const Loader = () => {
  const { t } = useLocalization();

  return (
    <div className="motion-fade-up flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-[rgba(21,119,128,0.18)]"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#157780] border-r-[#e57a4a]"></div>
      </div>
      <div className="text-center">
        <p className="display-font text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {t("common.appName")}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t("loader.loading")}
        </p>
      </div>
    </div>
  );
};

export default Loader;
