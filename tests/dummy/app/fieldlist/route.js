import Ember from 'ember';

export default Ember.Route.extend({

  model () {
    return {
      'currentVersion': 10.31,
      'id': 4,
      'name': 'Water Wells - Upper Peninsula',
      'type': 'Feature Layer',
      'description': 'There is a quality control check on location that may exclude a limited number of wells from Wellogic from the six files made available on this site.',
      'geometryType': 'esriGeometryPoint',
      'copyrightText': '',
      'parentLayer': null,
      'subLayers': [],
      'minScale': 50000000,
      'maxScale': 0,
      'drawingInfo': {
        'renderer': {
          'type': 'simple',
          'symbol': {
            'type': 'esriPMS',
            'url': '9975ca6994a2b72566909c4a7036e6dc',
            'imageData': 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD5JREFUCJkBMwDM/wQAAAAAElrLae7Z2awAzVzrBABFnR3uESp+AC4WIADNAHcEEhYzgu7//xgABQxoAEWjorpuET/2VfchAAAAAElFTkSuQmCC',
            'contentType': 'image/png',
            'width': 3,
            'height': 2,
            'angle': 0,
            'xoffset': 0,
            'yoffset': 0
          },
          'label': '',
          'description': ''
        },
        'transparency': 0,
        'labelingInfo': null
      },
      'defaultVisibility': true,
      'extent': {
        'xmin': -10064140.797583401,
        'ymin': 5109588.388336493,
        'xmax': -9174462.625422109,
        'ymax': 6130500.32795411,
        'spatialReference': {
          'wkid': 102100,
          'latestWkid': 3857
        }
      },
      'hasAttachments': false,
      'htmlPopupType': 'esriServerHTMLPopupTypeAsHTMLText',
      'displayField': 'WELLID',
      'typeIdField': null,
      'fields': [
        {
          'name': 'OBJECTID',
          'type': 'esriFieldTypeOID',
          'alias': 'OBJECTID',
          'domain': null
        },
        {
          'name': 'WELLID',
          'type': 'esriFieldTypeString',
          'alias': 'WELLID',
          'length': 12,
          'domain': null
        },
        {
          'name': 'COUNTY',
          'type': 'esriFieldTypeString',
          'alias': 'COUNTY',
          'length': 30,
          'domain': null
        },
        {
          'name': 'PERMIT_NUM',
          'type': 'esriFieldTypeString',
          'alias': 'PERMIT_NUM',
          'length': 20,
          'domain': null
        },
        {
          'name': 'TOWNSHIP',
          'type': 'esriFieldTypeString',
          'alias': 'TOWNSHIP',
          'length': 50,
          'domain': null
        },
        {
          'name': 'TOWN',
          'type': 'esriFieldTypeString',
          'alias': 'TOWN',
          'length': 3,
          'domain': null
        },
        {
          'name': 'RANGE',
          'type': 'esriFieldTypeString',
          'alias': 'RANGE',
          'length': 3,
          'domain': null
        },
        {
          'name': 'SECTION',
          'type': 'esriFieldTypeInteger',
          'alias': 'SECTION',
          'domain': null
        },
        {
          'name': 'OWNER_NAME',
          'type': 'esriFieldTypeString',
          'alias': 'OWNER_NAME',
          'length': 30,
          'domain': null
        },
        {
          'name': 'WELL_ADDR',
          'type': 'esriFieldTypeString',
          'alias': 'WELL_ADDR',
          'length': 50,
          'domain': null
        },
        {
          'name': 'WELL_CITY',
          'type': 'esriFieldTypeString',
          'alias': 'WELL_CITY',
          'length': 30,
          'domain': null
        },
        {
          'name': 'WELL_ZIP',
          'type': 'esriFieldTypeString',
          'alias': 'WELL_ZIP',
          'length': 9,
          'domain': null
        },
        {
          'name': 'WELL_DEPTH',
          'type': 'esriFieldTypeDouble',
          'alias': 'WELL_DEPTH',
          'domain': null
        },
        {
          'name': 'WELL_TYPE',
          'type': 'esriFieldTypeString',
          'alias': 'WELL_TYPE',
          'length': 6,
          'domain': null
        },
        {
          'name': 'TYPE_OTHER',
          'type': 'esriFieldTypeString',
          'alias': 'TYPE_OTHER',
          'length': 30,
          'domain': null
        },
        {
          'name': 'WEL_STATUS',
          'type': 'esriFieldTypeString',
          'alias': 'WEL_STATUS',
          'length': 6,
          'domain': null
        },
        {
          'name': 'STATUS_OTH',
          'type': 'esriFieldTypeString',
          'alias': 'STATUS_OTH',
          'length': 254,
          'domain': null
        },
        {
          'name': 'WSSN',
          'type': 'esriFieldTypeDouble',
          'alias': 'WSSN',
          'domain': null
        },
        {
          'name': 'WELL_NUM',
          'type': 'esriFieldTypeString',
          'alias': 'WELL_NUM',
          'length': 30,
          'domain': null
        },
        {
          'name': 'DRILLER_ID',
          'type': 'esriFieldTypeString',
          'alias': 'DRILLER_ID',
          'length': 10,
          'domain': null
        },
        {
          'name': 'DRILL_METH',
          'type': 'esriFieldTypeString',
          'alias': 'DRILL_METH',
          'length': 6,
          'domain': null
        },
        {
          'name': 'METH_OTHER',
          'type': 'esriFieldTypeString',
          'alias': 'METH_OTHER',
          'length': 30,
          'domain': null
        },
        {
          'name': 'CONST_DATE',
          'type': 'esriFieldTypeString',
          'alias': 'CONST_DATE',
          'length': 23,
          'domain': null
        },
        {
          'name': 'CASE_TYPE',
          'type': 'esriFieldTypeString',
          'alias': 'CASE_TYPE',
          'length': 6,
          'domain': null
        },
        {
          'name': 'CASE_OTHER',
          'type': 'esriFieldTypeString',
          'alias': 'CASE_OTHER',
          'length': 30,
          'domain': null
        },
        {
          'name': 'CASE_DIA',
          'type': 'esriFieldTypeDouble',
          'alias': 'CASE_DIA',
          'domain': null
        },
        {
          'name': 'CASE_DEPTH',
          'type': 'esriFieldTypeDouble',
          'alias': 'CASE_DEPTH',
          'domain': null
        },
        {
          'name': 'SCREEN_FRM',
          'type': 'esriFieldTypeDouble',
          'alias': 'SCREEN_FRM',
          'domain': null
        },
        {
          'name': 'SCREEN_TO',
          'type': 'esriFieldTypeDouble',
          'alias': 'SCREEN_TO',
          'domain': null
        },
        {
          'name': 'SWL',
          'type': 'esriFieldTypeDouble',
          'alias': 'SWL',
          'domain': null
        },
        {
          'name': 'FLOWING',
          'type': 'esriFieldTypeString',
          'alias': 'FLOWING',
          'length': 1,
          'domain': null
        },
        {
          'name': 'AQ_TYPE',
          'type': 'esriFieldTypeString',
          'alias': 'AQ_TYPE',
          'length': 6,
          'domain': null
        },
        {
          'name': 'TEST_DEPTH',
          'type': 'esriFieldTypeDouble',
          'alias': 'TEST_DEPTH',
          'domain': null
        },
        {
          'name': 'TEST_HOURS',
          'type': 'esriFieldTypeDouble',
          'alias': 'TEST_HOURS',
          'domain': null
        },
        {
          'name': 'TEST_RATE',
          'type': 'esriFieldTypeDouble',
          'alias': 'TEST_RATE',
          'domain': null
        },
        {
          'name': 'TEST_METHD',
          'type': 'esriFieldTypeString',
          'alias': 'TEST_METHD',
          'length': 6,
          'domain': null
        },
        {
          'name': 'TEST_OTHER',
          'type': 'esriFieldTypeString',
          'alias': 'TEST_OTHER',
          'length': 30,
          'domain': null
        },
        {
          'name': 'GROUT',
          'type': 'esriFieldTypeString',
          'alias': 'GROUT',
          'length': 1,
          'domain': null
        },
        {
          'name': 'PMP_CPCITY',
          'type': 'esriFieldTypeDouble',
          'alias': 'PMP_CPCITY',
          'domain': null
        },
        {
          'name': 'LATITUDE',
          'type': 'esriFieldTypeDouble',
          'alias': 'LATITUDE',
          'domain': null
        },
        {
          'name': 'LONGITUDE',
          'type': 'esriFieldTypeDouble',
          'alias': 'LONGITUDE',
          'domain': null
        },
        {
          'name': 'METHD_COLL',
          'type': 'esriFieldTypeString',
          'alias': 'METHD_COLL',
          'length': 6,
          'domain': null
        },
        {
          'name': 'ELEVATION',
          'type': 'esriFieldTypeDouble',
          'alias': 'ELEVATION',
          'domain': null
        },
        {
          'name': 'ELEV_METHD',
          'type': 'esriFieldTypeString',
          'alias': 'ELEV_METHD',
          'length': 6,
          'domain': null
        },
        {
          'name': 'WITHIN_CO',
          'type': 'esriFieldTypeString',
          'alias': 'WITHIN_CO',
          'length': 1,
          'domain': null
        },
        {
          'name': 'WITHIN_SEC',
          'type': 'esriFieldTypeString',
          'alias': 'WITHIN_SEC',
          'length': 1,
          'domain': null
        },
        {
          'name': 'LOC_MATCH',
          'type': 'esriFieldTypeString',
          'alias': 'LOC_MATCH',
          'length': 1,
          'domain': null
        },
        {
          'name': 'SEC_DIST',
          'type': 'esriFieldTypeString',
          'alias': 'SEC_DIST',
          'length': 8,
          'domain': null
        },
        {
          'name': 'ELEV_DEM',
          'type': 'esriFieldTypeInteger',
          'alias': 'ELEV_DEM',
          'domain': null
        },
        {
          'name': 'ELEV_DIF',
          'type': 'esriFieldTypeInteger',
          'alias': 'ELEV_DIF',
          'domain': null
        },
        {
          'name': 'LANDSYS',
          'type': 'esriFieldTypeString',
          'alias': 'LANDSYS',
          'length': 50,
          'domain': null
        },
        {
          'name': 'DEPTH_FLAG',
          'type': 'esriFieldTypeString',
          'alias': 'DEPTH_FLAG',
          'length': 1,
          'domain': null
        },
        {
          'name': 'ELEV_FLAG',
          'type': 'esriFieldTypeString',
          'alias': 'ELEV_FLAG',
          'length': 1,
          'domain': null
        },
        {
          'name': 'SWL_FLAG',
          'type': 'esriFieldTypeString',
          'alias': 'SWL_FLAG',
          'length': 1,
          'domain': null
        },
        {
          'name': 'SPC_CPCITY',
          'type': 'esriFieldTypeDouble',
          'alias': 'SPC_CPCITY',
          'domain': null
        },
        {
          'name': 'AQ_CODE',
          'type': 'esriFieldTypeString',
          'alias': 'AQ_CODE',
          'length': 1,
          'domain': null
        },
        {
          'name': 'ROCK_TOP',
          'type': 'esriFieldTypeInteger',
          'alias': 'ROCK_TOP',
          'domain': null
        },
        {
          'name': 'AQ_THK_1',
          'type': 'esriFieldTypeInteger',
          'alias': 'AQ_THK_1',
          'domain': null
        },
        {
          'name': 'AQ_THK_2',
          'type': 'esriFieldTypeInteger',
          'alias': 'AQ_THK_2',
          'domain': null
        },
        {
          'name': 'AQ_THK_D',
          'type': 'esriFieldTypeInteger',
          'alias': 'AQ_THK_D',
          'domain': null
        },
        {
          'name': 'H_COND_1',
          'type': 'esriFieldTypeDouble',
          'alias': 'H_COND_1',
          'domain': null
        },
        {
          'name': 'H_COND_2',
          'type': 'esriFieldTypeDouble',
          'alias': 'H_COND_2',
          'domain': null
        },
        {
          'name': 'V_COND_1',
          'type': 'esriFieldTypeDouble',
          'alias': 'V_COND_1',
          'domain': null
        },
        {
          'name': 'V_COND_2',
          'type': 'esriFieldTypeDouble',
          'alias': 'V_COND_2',
          'domain': null
        },
        {
          'name': 'TRANSMSV_1',
          'type': 'esriFieldTypeDouble',
          'alias': 'TRANSMSV_1',
          'domain': null
        },
        {
          'name': 'TRANSMSV_2',
          'type': 'esriFieldTypeDouble',
          'alias': 'TRANSMSV_2',
          'domain': null
        },
        {
          'name': 'B_AQ_THK',
          'type': 'esriFieldTypeInteger',
          'alias': 'B_AQ_THK',
          'domain': null
        },
        {
          'name': 'B_H_COND',
          'type': 'esriFieldTypeDouble',
          'alias': 'B_H_COND',
          'domain': null
        },
        {
          'name': 'B_V_COND',
          'type': 'esriFieldTypeDouble',
          'alias': 'B_V_COND',
          'domain': null
        },
        {
          'name': 'B_TRANS',
          'type': 'esriFieldTypeDouble',
          'alias': 'B_TRANS',
          'domain': null
        },
        {
          'name': 'AQ_THICK_D',
          'type': 'esriFieldTypeDouble',
          'alias': 'AQ_THICK_D',
          'domain': null
        },
        {
          'name': 'H_COND_D',
          'type': 'esriFieldTypeDouble',
          'alias': 'H_COND_D',
          'domain': null
        },
        {
          'name': 'V_COND_D',
          'type': 'esriFieldTypeDouble',
          'alias': 'V_COND_D',
          'domain': null
        },
        {
          'name': 'TRANS_D',
          'type': 'esriFieldTypeDouble',
          'alias': 'TRANS_D',
          'domain': null
        },
        {
          'name': 'AQ_FLAG',
          'type': 'esriFieldTypeString',
          'alias': 'AQ_FLAG',
          'length': 1,
          'domain': null
        },
        {
          'name': 'SCRN_FLAG',
          'type': 'esriFieldTypeString',
          'alias': 'SCRN_FLAG',
          'length': 1,
          'domain': null
        },
        {
          'name': 'NOTES',
          'type': 'esriFieldTypeString',
          'alias': 'NOTES',
          'length': 254,
          'domain': null
        },
        {
          'name': 'WELLCODE',
          'type': 'esriFieldTypeString',
          'alias': 'WELLCODE',
          'length': 254,
          'domain': null
        },
        {
          'name': 'TOPAQ',
          'type': 'esriFieldTypeDouble',
          'alias': 'TOPAQ',
          'domain': null
        },
        {
          'name': 'BOTAQ',
          'type': 'esriFieldTypeDouble',
          'alias': 'BOTAQ',
          'domain': null
        },
        {
          'name': 'Shape',
          'type': 'esriFieldTypeGeometry',
          'alias': 'Shape',
          'domain': null
        },
        {
          'name': 'WWAT_ID',
          'type': 'esriFieldTypeString',
          'alias': 'WWAT_ID',
          'length': 20,
          'domain': null
        }
      ],
      'relationships': [],
      'canModifyLayer': false,
      'canScaleSymbols': false,
      'hasLabels': false,
      'capabilities': 'Map,Query,Data',
      'maxRecordCount': 1000,
      'supportsStatistics': true,
      'supportsAdvancedQueries': true,
      'supportedQueryFormats': 'JSON, AMF',
      'ownershipBasedAccessControlForFeatures': {
        'allowOthersToQuery': true
      },
      'useStandardizedQueries': true,
      'advancedQueryCapabilities': {
        'useStandardizedQueries': true,
        'supportsStatistics': true,
        'supportsOrderBy': true,
        'supportsDistinct': true,
        'supportsPagination': false,
        'supportsTrueCurve': true,
        'supportsReturningQueryExtent': true,
        'supportsQueryWithDistance': true
      }
    }
  }
});
