import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import { KeyValueObject } from '../../pages';
import styles from './Footer.module.css';

const enUS = dynamic(() => import('./Footer.en-US'));
const frCA = dynamic(() => import('./Footer.fr-CA'));

export default function FooterDynamic(): JSX.Element {
  const { locale } = useRouter();

  let dynamicComponent: DynamicComponent;

  if (locale === 'en-US') {
    dynamicComponent = (
      enUS as unknown as React.Component
    ).render() as DynamicComponent;
  } else {
    dynamicComponent = (
      frCA as unknown as React.Component
    ).render() as DynamicComponent;
  }

  const messages = JSON.parse(
    dynamicComponent.type().props.children
  ) as KeyValueObject;

  return <footer className={styles.footer}>{messages.footer}</footer>;
}

type DynamicComponent = {
  type: () => {
    props: {
      children: string;
    };
  };
};
