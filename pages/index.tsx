import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Footer from '../components/Footer';

const Home: NextPage<MessagesContext> = (context) => {
  process.env.nextJsStaticLocale = context.locale;

  return (
    <div>
      <div>
        <a href="/en-US">English</a>
      </div>
      <div>
        <a href="/fr-CA">Français</a>
      </div>
      <br></br>
      {context.messages.greeting}
      <Footer></Footer>
    </div>
  );
};

export default Home;

/**
 * A simple "key/value" object used to store messages.
 */
export type KeyValueObject = {
  readonly [key: string]: string;
};

export type MessagesContext = {
  messages: KeyValueObject;
  locale: string;
};

export const getStaticProps: GetStaticProps<MessagesContext> = async (
  context: GetStaticPropsContext
) => {
  process.env.nextJsStaticLocale = context.locale;
  const messages = (await import(`./index.${context.locale}.json`))
    .default as KeyValueObject;

  return { props: { messages, locale: context.locale as string } }; // Empty properties, since we are only using this for the static paths to work.
};
