import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModal: boolean;
    handleCloseModal: () => void;
    type: string;
    blogEdit: IBlog | null;
}

const ModalAddBlog = (props: IProps) => {
    let {showModal, type, blogEdit} = props;
    console.log("Blog edit modal: ", blogEdit);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [id, setId] = useState<Number>(0);
    const [blog, setBlog] = useState<IBlog | null>(blogEdit);
    const [typeModal, setTypeModal] = useState<string>("");

    const handleClose = () => {
        props.handleCloseModal();
        setTitle("");
        setAuthor("");
        setContent("");
    }

    useEffect(() => {
        setTypeModal(type);
        if(type === "edit" && blogEdit) {
            setTitle(blogEdit.title);
            setAuthor(blogEdit.author);
            setContent(blogEdit.content);
            setId(blogEdit.id);
        }else {
            setTitle("");
            setAuthor("");
            setContent("");
            setBlog(null);
        }
    }, [type, blogEdit]);

    const onHandleBtnClick = async(type: string) => {
        if(!title || !author || !content) {
            toast.error("Missing blog information");
        }else {
            const data: any = {
                title,
                author,
                content
            }
            if(type === "add") {
                await fetch('http://localhost:8000/blogs', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(res => {
                        if(res) {
                            toast.success("Add new blog successfully");
                            handleClose();
                            mutate("http://localhost:8000/blogs"); //Hàm này dùng để refresh data
                        }else {
                            toast.error("Add new blog failed")
                        }
                    })
            }else if(type === "edit") {
                await fetch(`http://localhost:8000/blogs/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(res => {
                        if(res) {
                            toast.success("Edit blog successfully");
                            handleClose();
                            mutate("http://localhost:8000/blogs"); //Hàm này dùng để refresh data
                        }else {
                            toast.error("Edit blog failed")
                        }
                    })
            }
            
        }
    }

    return (
        <Modal 
            show={showModal} 
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
            <Modal.Title>Add new blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className='row'>
                <Form.Group className="mb-3 col-12 col-sm-6 col-lg-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title of the blog" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </Form.Group>
                <Form.Group className="mb-3 col-12 col-sm-6 col-lg-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author of the blog" onChange={(e) => setAuthor(e.target.value)} value={author}/>
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='Enter content of the blog' onChange={(e) => setContent(e.target.value)} value={content}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {type === "add" ? 
                <Button variant="primary" onClick={() => onHandleBtnClick("add")}>
                    Add
                </Button>
            :   <Button variant="warning" onClick={() => onHandleBtnClick("edit")}>
                    Update
                </Button>
            }
            
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddBlog;