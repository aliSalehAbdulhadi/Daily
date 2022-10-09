import Head from 'next/head';
import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title className="bg-red-500">Daily</title>
        <meta
          name="description"
          content="A simple to do app for your daily tasks"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#d58989" />
      </Head>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full semiSm:hidden">
          <TaskForm />
        </div>
        <TasksContainer />
      </div>
    </>
  );
};

export default Home;
