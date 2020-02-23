import React, { useEffect, useRef, useState  } from "react";
import { Modal } from "antd";
import $ from "jquery";

export default function ({ content, toggle, visibility, title, confirm }) {

    const didMountRef = useRef(false);
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (title != 'Izbirnik lokacije') {
            setMount(true);
            if (didMountRef.current) {
                console.log($('textarea'));
                $('textarea').each(function() {
                    $(this).height(0).height(this.scrollHeight)
                });
            } else didMountRef.current = true;
        }
    });
    
    return (
        <Modal
            title={title}
            visible={visibility}
            onOk={confirm ? confirm : toggle}
            onCancel={toggle}
            cancelButtonProps={{ style: { display: 'none' } }}
            width={"50vw"}
        >{content}</Modal>
    );
}
