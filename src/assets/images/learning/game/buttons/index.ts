// import * as buttonSelect from './buttonSelect'
import { ReactComponent as TA } from './ko/ta_default.svg';
import { ReactComponent as J } from './ko/j_default.svg'; //점프하기
import { ReactComponent as PU } from './ko/pu_default.svg'; // 줍기
import { ReactComponent as CI } from './ko/ci_default.svg'; // 얼음깨기
import { ReactComponent as CS } from './ko/cs_default.svg'; // 눈치우기
import { ReactComponent as D } from './ko/d_default.svg'; // 다이빙하기
import { ReactComponent as FI } from './ko/fi_default.svg'; // 물고기잡기
import { ReactComponent as Ff } from './ko/ff_default.svg'; // 먹이주기
import { ReactComponent as SI } from './ko/si_default.svg'; // 이글루고치기
import { ReactComponent as T } from './ko/t_default.svg'; // 얼음다듬기
import { ReactComponent as MG } from './ko/mg_default.svg'; // 대문만들기
import { ReactComponent as TN } from './ko/tn_default.svg'; // 시동켜기
import { ReactComponent as TF } from './ko/tf_default.svg'; // 시동끄기
import { ReactComponent as ST } from './ko/st_default.svg'; // 소리치기

import { ReactComponent as TA_c } from './ko/ta_click.svg'; // 제자리돌기
import { ReactComponent as J_c } from './ko/j_click.svg'; //점프하기
import { ReactComponent as PU_c } from './ko/pu_click.svg'; // 줍기
import { ReactComponent as CI_c } from './ko/ci_click.svg'; // 얼음깨기
import { ReactComponent as CS_c } from './ko/cs_click.svg'; // 눈치우기
import { ReactComponent as D_c } from './ko/d_click.svg'; // 다이빙하기
import { ReactComponent as FI_c } from './ko/fi_click.svg'; // 물고기잡기
import { ReactComponent as Ff_c } from './ko/ff_click.svg'; // 먹이주기
import { ReactComponent as SI_c } from './ko/si_click.svg'; // 이글루고치기
import { ReactComponent as T_c } from './ko/t_click.svg'; // 얼음다듬기
import { ReactComponent as MG_c } from './ko/mg_click.svg'; // 대문만들기
import { ReactComponent as TN_c } from './ko/tn_click.svg'; // 시동켜기
import { ReactComponent as TF_c } from './ko/tf_click.svg'; // 시동끄기
import { ReactComponent as ST_c } from './ko/st_click.svg'; // 소리치기

/* 이동하기 */
import { ReactComponent as S } from './ko/bt_front_default.svg'; // 앞으로 이동하기
import { ReactComponent as S_c } from './ko/bt_front_click.svg'; // 앞으로 이동하기
import { ReactComponent as SB } from './ko/bt_back_default.svg'; // 뒤로 이동하기
import { ReactComponent as SB_c } from './ko/bt_back_click.svg'; // 뒤로 이동하기
import { ReactComponent as TL } from './ko/bt_left_default.svg'; // 왼쪽으로 돌기
import { ReactComponent as TL_c } from './ko/bt_left_click.svg'; // 왼쪽으로 돌기
import { ReactComponent as TR } from './ko/bt_right_default.svg'; // 오른쪽으로 돌기
import { ReactComponent as TR_c } from './ko/bt_right_click.svg'; // 오른쪽으로 돌기

const gameButtons = {
    ko: {
        S: [S, S_c],
        SB: [SB, SB_c],
        TL: [TL, TL_c],
        TR: [TR, TR_c],
        TA: [TA, TA_c],
        J: [J, J_c],
        PU: [PU, PU_c],
        CI: [CI, CI_c],
        CS: [CS, CS_c],
        D: [D, D_c],
        FI: [FI, FI_c],
        Ff: [Ff, Ff_c],
        SI: [SI, SI_c],
        T: [T, T_c],
        MG: [MG, MG_c],
        TN: [TN, TN_c],
        TF: [TF, TF_c],
        ST: [ST, ST_c]
    },
    en: {}
};

export default gameButtons;
