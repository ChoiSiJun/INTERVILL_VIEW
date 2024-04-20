import { createSlice } from '@reduxjs/toolkit';
import moduleList from '@common/slice/ModuleData';

export interface moduleMenuProps {
  menuCode: string;
  menuName: string;
  menuPath: string;
  children?: {
    menuCode: string;
    menuName: string;
  }[];
}

export interface moduleProps {
  moduleCode: string;
  moduleName: string;
  menuList?: moduleMenuProps[];
}

interface ModuleInfoProps {
  moduleList: moduleProps[];
  accessModuleCode: string;
  accessModuleName: string;
  accessMenuCode: string;
  accessMenuName: string;
  accessPath: string;
}

const initialState: ModuleInfoProps = {
  moduleList: moduleList,
  accessModuleCode: '',
  accessModuleName: '',
  accessMenuCode: '',
  accessMenuName: '',
  accessPath: '',
};

export const ModuleInfoSlice = createSlice({
  name: 'moduleInfo',
  initialState,
  reducers: {
    moduleAccess: (state, action) => {
      const location = action.payload;
      state.moduleList.forEach(moduleItem => {
        moduleItem.menuList?.forEach(menuItem => {
          if (location.pathname === menuItem.menuPath) {
            state.accessModuleCode = moduleItem.moduleCode;
            state.accessModuleName = moduleItem.moduleName;
            state.accessMenuCode = menuItem.menuCode;
            state.accessMenuName = menuItem.menuName;
            state.accessPath = menuItem.menuPath;
          }
        });
      });

      return state;
    },
  },
});

export const { moduleAccess } = ModuleInfoSlice.actions;
export default ModuleInfoSlice.reducer;
