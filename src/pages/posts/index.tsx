import Head from 'next/head';
import styles from './styles.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>

          <a href="#">
            <time>12 de março de 2022</time> 
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage and bla bla bla</p>
          </a>
        </div>

      </main>
    </>
  );
}