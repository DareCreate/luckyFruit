
/**
 * 所有的类型生命最好都使用 "I" 开头
 */
export interface IApiData {
    isSuccess: boolean;
    data: any;
    errMsg?: string;
}

// interface IApiResData {
//     perms: string[];
//     router: any[];
//     token: string;
//     user: any;
// }



/** menu data */
export interface IMenuListData extends IApiData {
    data: IMenuListItem[];
}

export interface IRoleMenuBody {
    createTime: number;
    createUser: number;
    hidden: boolean;
    menuId: number;
    name: string;
    orderNum: number;
    parentId: number;
    requestType: string;
    type: string;
    updateTime: number;
    updateUser: number;
    url: string;
}

interface IMenuListItem {
    attributes: object;
    checked: boolean;
    children: any[];
    hasChildren: boolean;
    hasParent: boolean;
    id: string;
    parentId: string;
    object: any;
    state: any;
    text: string;
}

/** user */
export interface IUserListResData extends IApiData {
    data: IUserListData;
}
export interface IUserListData  {
    currentPage: number;
    data: IUserListItem[];
    pageSize: number;
    start: number;
    total: number;
}
export interface IUserListItem {
    birth: number;
    gmtCreate?: number;
    gmtModified?: number;
    picId: number;
    mobile: number;
    city: string;
    district: string;
    hobby: string;
    liveAddress: string;
    email: string;
    name: string;
    province: string;
    roleIds: number[] | null;
    sex: number;
    status: number;
    userId: number;
    userIdCreate: number;
    tenantId: number;
    username: string;
}

/** role */
export interface IRoleListData extends IApiData {
    data: {
        data: IUserRoleInfoItem[];
        currentPage: number;
        pageSize: number;
        start: number;
        total: number;
    };
}
export interface IUserRoleInfoItem {
    roleId: number;
    menuIds: number;
    userIdCreate: number;
    roleName: string;
    roleSign: string;
    remark: string;
    gmtCreate: number | null;
    gmtModified: number | null;
}
