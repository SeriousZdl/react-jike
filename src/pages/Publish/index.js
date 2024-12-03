import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { getchannelAPI } from '../../apis/article'
import { useEffect } from 'react'
import { createArticleAPI } from '../../apis/article'

const { Option } = Select

const Publish = () => {
// 获取频道列表
const [channelList, setChannelList] =  useState([])
useEffect(() => {
  // 1. 封装函数 
   const getChannelList = async () => {
    const res = await getchannelAPI()
    setChannelList(res.data.channels)
  }
  // 2. 调用函数
  getChannelList()
},[])

  // 提交表单
  
  const [content, setContent] = useState('')
  const onFinish = (formValue) => {
    // 1. 按照接口文档的格式处理收集到的表单数据
    console.log(formValue);
    // // 展开formValue
    const { title,  channel_id } = formValue

    const reqData = {
       title,
       content,
       cover: {
         type: 0,
         images: []
       },
       channel_id
    }

    // 2. 调用接口实现发布文章
     createArticleAPI(reqData)
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>

              {/* value 属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map((item) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
           {/* <Option value={0}>推荐</Option> */}

            </Select>
          </Form.Item>

          {/* 富文本编辑器 */}
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
              <ReactQuill
                value={content}
                onChange={setContent}
                className="publish-quill"
                theme="snow"
                placeholder="请输入文章内容"
              />
            </Form.Item>
          </Form>


          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish