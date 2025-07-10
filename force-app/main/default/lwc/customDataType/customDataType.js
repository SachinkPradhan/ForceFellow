import LightningDatatable from 'lightning/datatable';
import customNameTemplate from './customName.html';
import customRankTemplate from './customRank.html';
import customImageTemplate from './customImage.html';
import customPickListTemplate from './customPickList.html';
import customPickListEditTemplate from './customPickListEdit.html'

export default class CustomDataType extends LightningDatatable {

    static customTypes = {
        customNameType: {
          template: customNameTemplate,
          standardCellLayout: true,
          typeAttributes: ["contactName"],
        },
        customRank: {
          template: customRankTemplate,
          standardCellLayout: false,
          typeAttributes: ["rankIcon"],
        },
        customPicture: {
            template: customImageTemplate,
            standardCellLayout: true,
            typeAttributes: ["pictureUrl"],
          },
          customPickList: {
            template: customPickListTemplate,
            editTemplate: customPickListEditTemplate,
            standardCellLayout: true,
            typeAttributes: ["options", "value", "context"],
          },
        // Other custom types here
      };
}