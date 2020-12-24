## 图文视频详情

在使用的WXML内引入
  <include src="../../layouts/imagetext/imagetext.wxml" />
在使用的wxss内引入
  @import '../../layouts/imagetext/imagetext.wxss';

需要的参数
<template is='imagetext' data='{{list}}' />

list Array类型 数据的列表
    - content   // 文本
    - photo     // 图片
    - video     // 视频
