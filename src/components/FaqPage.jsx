import { useEffect, useMemo, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiCalendarScheduleLine,
  RiCloudLine,
  RiGlobalLine,
  RiMicLine,
  RiQuestionLine,
} from "react-icons/ri";
import { getFaqContent } from "../constants/faqContent";
import { useLocalization } from "../hooks/useLocalization";
import Button from "./ui/Button";
import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import StatusPill from "./ui/StatusPill";

const SECTION_ICONS = {
  basics: RiQuestionLine,
  organization: RiGlobalLine,
  "sync-mobile": RiCloudLine,
};

const QUICK_TIP_ICONS = [RiMicLine, RiCalendarScheduleLine, RiCloudLine];

const FaqPage = ({ onOpenTasks }) => {
  const { language } = useLocalization();
  const content = getFaqContent(language);
  const defaultOpenItemId = useMemo(() => {
    return content.sections[0]?.items[0]?.id ?? null;
  }, [content.sections]);
  const [openItemId, setOpenItemId] = useState(defaultOpenItemId);

  useEffect(() => {
    setOpenItemId(defaultOpenItemId);
  }, [defaultOpenItemId]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 lg:gap-6">
      <GlassPanel className="motion-fade-up relative overflow-hidden rounded-[2rem] p-4 shadow-[0_30px_100px_rgba(17,35,46,0.12)] sm:p-6 lg:p-8">
        <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[rgba(229,122,74,0.18)] blur-3xl sm:h-40 sm:w-40"></div>
        <div className="absolute bottom-[-2rem] left-[-0.75rem] h-36 w-36 rounded-full bg-[rgba(21,119,128,0.18)] blur-3xl sm:bottom-[-3rem] sm:h-48 sm:w-48"></div>

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,22rem)] xl:items-start">
          <div className="min-w-0">
            <EyebrowChip icon={RiQuestionLine}>{content.eyebrow}</EyebrowChip>
            <h1 className="display-font mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
              {content.description}
            </p>

            <div className="mt-6">
              <Button onClick={onOpenTasks} variant="secondary" size="md">
                <RiArrowLeftLine className="text-lg" />
                <span>{content.backToTasks}</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {content.quickTips.map((tip, index) => {
              const TipIcon = QUICK_TIP_ICONS[index] ?? RiQuestionLine;

              return (
                <div
                  key={tip.title}
                  className="h-full rounded-[1.5rem] border border-white/70 bg-white/78 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/60"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {content.quickTipsTitle}
                  </p>
                  <div className="mt-3 space-y-2">
                    <StatusPill
                      icon={TipIcon}
                      tone="accent"
                      className="w-fit px-3 py-1"
                    >
                      {tip.title}
                    </StatusPill>
                    <p className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                      {tip.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {content.sections.map((section) => {
          const SectionIcon = SECTION_ICONS[section.id] ?? RiQuestionLine;

          return (
            <GlassPanel
              key={section.id}
              className="motion-fade-up p-4 shadow-[0_30px_100px_rgba(17,35,46,0.09)] sm:p-5"
            >
              <div className="mb-4">
                <EyebrowChip icon={SectionIcon}>{section.title}</EyebrowChip>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {section.description}
                </p>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => {
                  const isOpen = openItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-[1.3rem] border p-3 transition ${
                        isOpen
                          ? "border-[rgba(21,119,128,0.2)] bg-[rgba(21,119,128,0.08)] dark:border-[rgba(84,205,208,0.22)] dark:bg-[rgba(84,205,208,0.08)]"
                          : "border-slate-200 bg-white/88 dark:border-slate-800 dark:bg-slate-900/72"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenItemId((current) =>
                            current === item.id ? null : item.id
                          )
                        }
                        className="flex w-full items-start justify-between gap-3 text-left"
                      >
                        <span className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
                          {item.question}
                        </span>
                        <RiArrowRightSLine
                          className={`mt-0.5 shrink-0 text-xl text-slate-400 transition dark:text-slate-500 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isOpen ? (
                        <p className="mt-3 border-t border-black/5 pt-3 text-sm leading-6 text-slate-600 dark:border-white/8 dark:text-slate-300">
                          {item.answer}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
};

export default FaqPage;
