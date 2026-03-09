import { lazy, Suspense, useEffect, useState } from "react";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import DeleteCompletedButton from "./components/DeleteCompletedButton";
import Loader from "./components/Loader";
import Notification from "./components/Notification";
import InstallAppButton from "./components/InstallAppButton";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useLocalization } from "./hooks/useLocalization";
import AppViewSwitcher from "./components/AppViewSwitcher";

const MainContent = lazy(() => import("./components/MainContent"));
const FaqPage = lazy(() => import("./components/FaqPage"));

const APP_PAGES = {
  TASKS: "tasks",
  FAQ: "faq",
};

const getPageFromHash = () => {
  if (typeof window === "undefined") {
    return APP_PAGES.TASKS;
  }

  return window.location.hash.replace("#", "") === APP_PAGES.FAQ
    ? APP_PAGES.FAQ
    : APP_PAGES.TASKS;
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [page, setPage] = useState(getPageFromHash);
  const { t } = useLocalization();

  const {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    hasCompletedTodos,
    onReorder,
    pendingActions,
    isSyncingPending,
    conflictStrategy,
    setConflictStrategy,
  } = useTodoManagement();

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [page]);

  const navigateToPage = (nextPage) => {
    if (typeof window === "undefined") {
      setPage(nextPage);
      return;
    }

    const nextHash = nextPage === APP_PAGES.FAQ ? APP_PAGES.FAQ : APP_PAGES.TASKS;

    if (window.location.hash.replace("#", "") === nextHash) {
      setPage(nextPage);
      return;
    }

    window.location.hash = nextHash;
  };

  return (
    <div
      data-theme={theme}
      className="relative min-h-[100dvh] overflow-hidden bg-page-light text-txt-light dark:bg-page-dark dark:text-txt-dark"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-5rem] h-72 w-72 rounded-full bg-[rgba(229,122,74,0.22)] blur-3xl"></div>
        <div className="absolute top-1/3 left-[-6rem] h-80 w-80 rounded-full bg-[rgba(21,119,128,0.16)] blur-3xl"></div>
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-[rgba(255,255,255,0.1)] blur-3xl dark:bg-[rgba(26,140,148,0.12)]"></div>
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-3 py-4 sm:px-6 sm:py-5 lg:px-10">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full lg:w-auto lg:flex-1 lg:max-w-[34rem]">
            <AppViewSwitcher currentPage={page} onChange={navigateToPage} />
          </div>

          <div className="grid w-full grid-cols-1 gap-3 min-[360px]:grid-cols-[minmax(0,1fr)_auto] lg:w-auto lg:flex lg:flex-wrap lg:items-start lg:justify-end">
            <div className="min-[360px]:col-span-2 lg:col-auto">
              <InstallAppButton />
            </div>

            <div className="min-w-0">
              <LanguageSwitcher />
            </div>

            <div className="min-w-0">
              <ToggleTheme
                toggleTheme={() => toggleTheme(setTheme)}
                theme={theme}
              />
            </div>
          </div>
        </div>

        <Notification />

        <Suspense fallback={<Loader />}>
          {page === APP_PAGES.FAQ ? (
            <FaqPage onOpenTasks={() => navigateToPage(APP_PAGES.TASKS)} />
          ) : (
            <MainContent
              onAdd={onAdd}
              todos={todos}
              handleUpdate={handleUpdate}
              toggleComplete={toggleComplete}
              setDeletingId={setDeletingId}
              onReorder={onReorder}
              pendingActionsCount={pendingActions.length}
              isSyncingPending={isSyncingPending}
              pendingActions={pendingActions}
              conflictStrategy={conflictStrategy}
              setConflictStrategy={setConflictStrategy}
            />
          )}
        </Suspense>

        {page === APP_PAGES.TASKS ? (
          <DeleteCompletedButton
            onClick={handleDeleteCompleted}
            hasCompletedTodos={hasCompletedTodos}
          />
        ) : null}
      </div>

      {page === APP_PAGES.TASKS ? (
        <>
          <DeleteConfirmModal
            isOpen={Boolean(deletingId)}
            onCancel={() => setDeletingId(null)}
            onConfirm={() => {
              handleDelete(deletingId);
              setDeletingId(null);
            }}
            message={t("app.deleteTaskMessage")}
          />

          <DeleteConfirmModal
            isOpen={isDeletingCompleted}
            onCancel={() => setIsDeletingCompleted(false)}
            onConfirm={confirmDeleteCompleted}
            message={t("app.deleteCompletedMessage", {
              count: todos.filter((todo) => todo.completed).length,
            })}
          />
        </>
      ) : null}
    </div>
  );
}

export default App;
