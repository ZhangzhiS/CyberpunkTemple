# 赛博神庙

敲电子木鱼，修赛博功德，拜机械佛祖。

## 截图

![App Screenshot](screenshot/screenshot.jpg)

## 说明

使用 Python + uni-app 开发。后端接入了 chatgpt 进行问答。这里开源的是前端代码，后端接口写在了私人项目中，不便于开源，接口内容比较简单，可以自己用擅长的语言重写。

数据表如下：

```python
class Base(BaseModel):
    __abstract__ = True

    id = Column(Integer(), primary_key=True)
    create_time = Column(DateTime(), default=datetime.now, comment='添加时间')
    update_time = Column(DateTime(), comment='更新时间')

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    def as_dict(self, exclude=None) -> dict:
        if exclude is None:
            exclude = {}
        res = dict()
        for c in inspect(self).mapper.column_attrs:
            if c.key in exclude:
                continue
            res[c.key] = getattr(self, c.key)
        return res


class UserModel(Base):
    """用户"""

    openid = Column(String(128), nullable=False, comment='OpenID', unique=True)
    merits = Column(Integer(), default=0, comment="功德总数")
    can_use_merits = Column(Integer(), default=0, comment="可用功德")


class UserQuestionModel(Base):
    """问题记录"""

    openid = Column(String(128), nullable=False, comment='OpenID')
    question = Column(String(255), nullable=False, comment="用户提问")
    answer = Column(Text(), nullable=False, comment="答案")


class MeritsRecordModel(Base):
    """功德表"""

    openid = Column(String(128), nullable=False, comment='OpenID')
    count = Column(Integer(), default=0, comment="数量")
    m_type = Column(Integer(), default=0, comment="功德类型, 1: in, 2: out")
    remark = Column(String(), comment="备注")
```
## 运行

前端使用 uni-app 进行开发，使用 HBuilderX 进行开发或者运行到微信开发者工具即可。


## 其他

[图鸟 UI](https://vue2.tuniaokj.com/)


## License

[MIT](https://choosealicense.com/licenses/mit/)


