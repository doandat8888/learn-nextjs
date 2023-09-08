import Image from 'next/image'
import styles from './page.module.css';
import Link from 'next/link';
import styleHome from '@/styles/app.module.css';
import Table from 'react-bootstrap/Table';
import pages from '@/app/data';
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable' //Auto revalidate (cache data)
import AppTable from '@/components/table';
import { Metadata } from 'next';

export default function Home() {
    return (
        <div className={styleHome['home-page']}>
            {pages && pages.map(item => (
                <div key={item.id}>
                    <li className={styleHome['red']}><Link href={item.route}>{item.name}</Link></li>
                </div>
            ))}
        </div>
    )
}

export const metadata: Metadata = {
    title: 'Home page',
    description: 'Blogs page',
}
  
