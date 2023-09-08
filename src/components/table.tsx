import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ModalAddBlog from './modal.addblog';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    blogs: IBlog[];
}

const AppTable = (props: IProps) => {
    let {blogs} = props;
    let [showModal, setShowModal] = useState(false);
    let [type, setType] = useState<string>("");
    let [blogEdit, setBlogEdit] = useState<IBlog | null>(null);

    const handleOnClickAddBtn = () => {
        setShowModal(true);
        setType("add");
    }

    const handleOnClickEditBtn = (blog: IBlog) => {
        setShowModal(true);
        setType("edit");
        setBlogEdit(blog);
        console.log("Blog edit: ", blog);
    }

    const onHandleCloseModal = () => {
        setShowModal(false);
        setBlogEdit(null);
        setType("");
    }

    const handleDeleteBlog = async(idBlog: Number) => {
        await fetch(`http://localhost:8000/blogs/${idBlog}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(res => {
                    if(res) {
                        toast.success("Delete blog successfully");
                        mutate("http://localhost:8000/blogs"); //Hàm này dùng để refresh data
                    }else {
                        toast.error("Delete blog failed")
                    }
                })
    }

    return (
        <>
            <ModalAddBlog showModal={showModal} handleCloseModal={onHandleCloseModal} type={type} blogEdit={blogEdit}/>
            <div className='mb-3' style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>Title Blogs</h3>
                <Button onClick={() => handleOnClickAddBtn()} variant='secondary'>Add new</Button>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs && blogs.length > 0 && blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.id}</td>
                            <td>{blog.title}</td>
                            <td>{blog.author}</td>
                            <td>
                                <Button variant='primary mx-2'>
                                    <Link style={{textDecoration: 'none', color: 'white'}} href={`/blogs/${blog.id}`}>View</Link>
                                </Button>
                                <Button variant='warning mx-2' onClick={() => handleOnClickEditBtn(blog)}>Edit</Button>
                                <Button variant='danger mx-2' onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default AppTable;
