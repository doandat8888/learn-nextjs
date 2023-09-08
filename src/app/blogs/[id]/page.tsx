'use client';
import useSWR from 'swr';
import blogDetailStyle from '@/styles/blogdetail.module.css';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const BlogDetail = (props: any) => {

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    const GetBlogById = (id: Number) => {
        const { data, error, isLoading } = useSWR(`http://localhost:8000/blogs/${id}`, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
          })
        if (error) alert("Error fetching data")
        if (isLoading) return <div>Loading...</div>;
        return data;
    }

    const blog: IBlog = GetBlogById(props.params.id);

    return (
        <div className={blogDetailStyle['blog-detail']}>
            <Button variant='primary'>
                <Link href={'/blogs'} className={blogDetailStyle['back-btn']}>Back</Link>
            </Button>
            <div className={blogDetailStyle['title']}>{blog?.title}</div>
            <div className={blogDetailStyle['author']}>by {blog?.author}</div>
            <div className={blogDetailStyle['content']}>{blog?.content}</div>
        </div>
    )
}

export default BlogDetail;