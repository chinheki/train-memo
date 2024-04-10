import React, { useState,useCallback } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

function Login({loaclToken,localUserId,onChangeToken,onChangeUser}) {
    const [name, setName] = useState(localUserId||'');
    const [token, setToken] = useState(loaclToken||'');

    const handleNameChange = (event) => {
        setName(event?.target?.value);
    };

    const handleTokenChange = (event) => {
        setToken(event?.target?.value);
    };

    const handleSubmit =useCallback((event) => {
        event?.preventDefault();
        onChangeToken(token);
        onChangeUser(name);
    },[name,token]);

    return (
        <div className="train-board">
          <div className="train-row">
                Login
                </div>
          <div className="train-row">
                    Name:
            <Input onChange={handleNameChange} value={name}></Input>
                </div>
          <div className="train-row">
                Token:
                <Input.Password
                    placeholder="input token"
                    onChange={handleTokenChange} value={token}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
                </div>
            <div className="train-row">
                          <Button onClick={e=>handleSubmit(e)}>
            保存
          </Button>
                </div>
        </div>
    );
}

export default Login;