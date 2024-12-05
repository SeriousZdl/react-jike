import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'

import { createArticleAPI } from '../../apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {

  const  { channelList } = useChannel()


  // 提交表单

  const [content, setContent] = useState('')
  const onFinish = (formValue) => {
    // 校验封面类型imageType 是否和实际的图片列表imageList数量是相等的
    if( imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
      
    // 1. 按照接口文档的格式处理收集到的表单数据
    console.log(formValue);
    // // 展开formValue
    const { title, channel_id } = formValue

    const reqData = {
      title,
      content,
      cover: {
        type: imageType, //封面模式
        images: imageList.map(item => item.response.data.url)   //图片列表 后端要求 数组[https://geek.itheima.net/uploads/16886878.jpg] 格式
      },
      channel_id
    }
    
    // 2. 调用接口实现发布文章
    createArticleAPI(reqData)
    
  }
  // 上传图片回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {  
    setImageList(value.fileList)
  }
  

  
  //  切换封面类型
  const [imageType, setImageType] = useState(1)
  // 选择封面类型 三图type为3 单图type为0 无图 type为0
  const onTypeChange = (value) => {
    console.log(value.target.value);//类型 1 3 0
    setImageType(value.target.value)
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
          initialValues={{ type: 1 }}// 设置图片上传类型的 默认值
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



          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>


            {/* 
            Upload组件的  
                listType: 决定选择文件框的外观样式  
                showUploadList: 控制显示上传列表
                */}
                {
                  imageType > 0 &&  
                   <Upload
                  listType="picture-card"
                  showUploadList
                  action={'http://geek.itheima.net/v1_0/upload'}
                  name='image'
                  onChange={onChange}
                  maxCount={imageType}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
                }

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