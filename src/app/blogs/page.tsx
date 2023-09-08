'use client';
import AppTable from "@/components/table";
import useSWR from 'swr';

const Blogs = () => {

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    function FetchDataSWR () {
        const { data, error, isLoading } = useSWR('http://localhost:8000/blogs', fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
          })
        if (error) alert("Error fetching data")
        if (isLoading) return <div>Loading...</div>;
        return data;
    }

    const data: IBlog[] = FetchDataSWR();

    return (
        <div className="mt-4">
            <AppTable blogs={data}/>
        </div>
    )
}

export default Blogs;