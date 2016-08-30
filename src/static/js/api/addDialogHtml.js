/**
 * Created by wangxinyu on 16/3/2.
 * 模态弹窗的内容
 */

define(["lib/jquery","util/funcTpl","lib/juicer"],function($,funcTpl){
    var dialogHtml = {
        tpl: function (str, data) {
            return juicer(funcTpl(dialogHtml[str]), data);
        },
        updateApk:function () {
            /*
            <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="apk_url">APK 文件</label>
                             <input type="file" class="form-control input-sm" id="apk_url" name="apk_url" data-file="apk_url" value="">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="apk_version">版本号</label>
                             <input class="form-control input-sm" id="apk_version" name="apk_version" value="">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="apk_forceInstall">是否强制更新</label>
                             <input type="text" class="form-control input-sm" id="apk_forceInstall" name="apk_forceInstall" value="" placeholder="1-是，0-否">
                         </div>
                         <div class="form-group">
                             <label for="apk_updateInfo">更新信息</label>
                             <input type="text" class="form-control input-sm" id="apk_updateInfo" name="apk_updateInfo" value="">
                         </div>
                     </form>
                 </div>
             </div>
             */
        },
        addSchool:function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="schoolId">学校Id</label>
                             <input class="form-control input-sm" id="schoolId" name="campusId" value="">
                         </div><!-- /form-group -->
                         <!-- <div class="form-group">
                             <label for="schoolName">学校名称</label>
                             <select class="form-control selectpicker" id="schoolName">${schoolName}</select>
                         </div> -->
                     </form>
                 </div>
             </div>
            */
        },
        addBanner:function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <!-- <div class="form-group">
                             <label for="isApp">配置地址</label>
                             <input type="text" class="form-control input-sm" id="isApp" name="isApp" value="${isApp}" placeholder="1-配置到PC端，2-配置到APP端">
                         </div> --><!-- /form-group -->
                         <div class="form-group">
                             <label for="bannerPicture">图片</label>
                             <input type="file" class="form-control input-sm" id="bannerPicture" name="bannerPicture" data-file="bannerPicture" value="${bannerPicture}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="background">背景色</label>
                             <input type="text" class="form-control input-sm" id="background" name="background" value="${background}" placeholder="#a5e7f3">
                         </div>
                         <div class="form-group">
                             <label for="bannerUrl">图片链接</label>
                             <input type="text" class="form-control input-sm" id="bannerUrl" name="bannerUrl" placeholder="www.campussay.com" value="${bannerUrl}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="bannerTypeId">领域ID</label>
                             <input type="text" class="form-control input-sm" id="bannerTypeId" name="bannerTypeId" value="${bannerTypeId}" placeholder="领域id">
                         </div>
                         <!--<div class="form-group">
                             <label for="bannerType">领域类型</label>
                             <input type="text" class="form-control input-sm" id="bannerType" name="bannerType" value="${bannerType}" placeholder="0-跳转听听堂，1-话题社，2-个人主页">
                         </div> -->
                         <div class="form-group">
                             <label for="bannerNote">备注</label>
                             <input type="text" class="form-control input-sm" id="bannerNote" name="bannerDesc" placeholder="校园说推广" value="${bannerDesc}">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div> 
            */
        },
        addAppBanner:function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="banner_pic">图片</label>
                             <input type="file" class="form-control input-sm" id="banner_pic" name="banner_pic" data-file="banner_pic" value="${banner_pic}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="banner_url">图片链接</label>
                             <input type="text" class="form-control input-sm" id="banner_url" name="banner_url" placeholder="www.campussay.com" value="${banner_url}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="banner_type_id">跳转后所需id</label>
                             <input type="text" class="form-control input-sm" id="banner_type_id" name="banner_type_id" value="${banner_type_id}" placeholder="跳转后所需id(必填)" required="required">
                         </div>
                         <div class="form-group">
                             <label for="banner_type">跳转类型</label>
                             <input type="text" class="form-control input-sm" id="banner_type" name="banner_type" value="${banner_type}" placeholder="0-跳转听听堂，1-话题社，2-个人主页(必填)" required="required">
                         </div> 
                         <div class="form-group">
                             <label for="bannerType">顺序</label>
                             <input type="text" class="form-control input-sm" id="bannerType" name="banner_order" value="${banner_order}" placeholder="0(必填)" required="required">
                         </div> 
                         <div class="form-group">
                             <label for="bannerNote">备注</label>
                             <input type="text" class="form-control input-sm" id="bannerNote" name="banner_desc" placeholder="校园说推广" value="${banner_desc}">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div> 
            */
        },
        addTalking: function () {
            /*
            <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="talkingId">talking ID</label>
                             <input type="text" class="form-control input-sm" name="talkingId" id="talkingId" value="${talkingId}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="talkingNote">备注</label>
                             <input type="text" class="form-control input-sm" name="talkingTarget" id="talkingNote" placeholder="校园说推广" value="${talkingTarget}">
                         </div>
                     </form>
                 </div>
             </div>
             */
        },
        editTalking: function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="talkingPic">图片</label>
                             <input type="file" class="form-control input-sm" name="talkingMainPicture" id="talkingPic" data-file="talkingPic" value="${talkingMainPicture}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="talkingId">talking ID</label>
                             <input type="text" class="form-control input-sm" name="talkingId" id="talkingId" value="${talkingId}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="talkingNote">备注</label>
                             <input type="text" class="form-control input-sm" name="talkingTarget" id="talkingNote" placeholder="校园说推广" value="${talkingTarget}">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div>
            */
        },
        addStar: function () {
            /*
            <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="userId">用户ID</label>
                             <input type="text" class="form-control input-sm" name="starUser" id="userId" value="${starUser}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="userNote">备注</label>
                             <input type="text" class="form-control input-sm" name="starReason" id="userNote" placeholder="推广刘总" value="${starReason}">
                         </div>
                     </form>
                 </div>
             </div>
             */
        },
        editStar: function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="userPic">图片</label>
                             <input type="file" class="form-control input-sm" name="starPicture" id="userPic" data-file="userPic" value="${starPicture}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="userId">用户ID</label>
                             <input type="text" class="form-control input-sm" name="starUser" id="userId" value="${starUser}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="userNote">备注</label>
                             <input type="text" class="form-control input-sm" name="starReason" id="userNote" placeholder="推广刘总" value="${starReason}">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div>
            */
        },
        addField: function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="fieldName">领域 ID</label>
                             <input type="text" class="form-control input-sm" name="talkingTypeId" id="fieldName" placeholder="talkingTypeId" value="${talkingTypeId}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="fieldPic">领域图片</label>
                             <input type="file" class="form-control input-sm" name="talkingTypePath" id="fieldPic" data-file="fieldPic" value="${talkingTypePicture}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="Order">显示顺序</label>
                             <input type="text" class="form-control input-sm" name="Order" id="Order" value="${TTalkingTypeOrder}">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div>
            */
        },
        addFieldContent: function () {
            /*
            <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="talkingId">Talking ID</label>
                             <input type="text" class="form-control input-sm" id="talkingId" name="talkingId" value="${talkingId}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="note">备注</label>
                             <input type="text" class="form-control input-sm" name="talkingDescription" value="${talkingInfo}" id="note" placeholder="推广刘总">
                         </div>
                     </form>
                 </div>
             </div>
             */
        },
        editFieldContent: function () {
            /*
             <div class="panel panel-default">
                 <div class="panel-body">
                     <form>
                         <div class="form-group">
                             <label for="fieldPic">图片</label>
                             <input type="file" class="form-control input-sm" name="talkingPicture" data-file="fieldPic" value="${talkingMainPicture}" id="fieldPic" placeholder="考研">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="talkingId">Talking ID</label>
                             <input type="text" class="form-control input-sm" id="talkingId" name="talkingId" value="${talkingId}">
                         </div><!-- /form-group -->
                         <div class="form-group">
                             <label for="note">备注</label>
                             <input type="text" class="form-control input-sm" name="talkingDescription" value="${talkingInfo}" id="note" placeholder="推广刘总">
                         </div><!-- /form-group -->
                     </form>
                 </div>
             </div>
            */
        }
    };
    return dialogHtml.tpl;
});