import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';


const { confirm } = Modal;


const DeleteConfirm = props => {

    const showConfirm = () => {
        confirm({
            title: "האם אתה בטוח שברצונך למחוק פריט זה?",
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
                props.deleteConfirm()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    if (props.delete) showConfirm()
    //alert(props.delete + "props.delete")
    // console.log({ delprops: props });
    // if (props.delete) {
    //     showConfirm();
    //     props.setTaskDelete(false)
    // }
    return (
        <div>
            {/* <Button onClick={showConfirm}>Confirm</Button> */}
        </div>
    )
}

export default DeleteConfirm
