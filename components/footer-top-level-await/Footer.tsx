import { useRouter } from 'next/router';
import React from 'react';

import { KeyValueObject } from '../../pages';
import styles from './Footer.module.css';

const enUS = (await import('./Footer.en-US.json')).default;
const frCA = (await import('./Footer.fr-CA.json')).default;

export default function FooterTopLevelAwait(): JSX.Element {
  const { locale } = useRouter();

  let messages: KeyValueObject;

  if (locale === 'en-US') {
    messages = enUS;
  } else {
    messages = frCA;
  }

  return <footer className={styles.footer}>{messages.footer}</footer>;
}
