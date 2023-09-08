'use client';
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Facebook = () => {

    const router = useRouter();

    const handleBtnClick = () => {
        router.push('/');
    }

    return (
        <div className="facebook-page">
            <p>This is Facebook page</p>
            <Button variant="primary">Đoàn Trần Bá Đạt</Button>
            <button onClick={() => handleBtnClick()}>Back</button>
        </div>
    )
}

export default Facebook;