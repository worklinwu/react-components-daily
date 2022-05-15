import { useImperativeHandle, forwardRef, ForwardRefRenderFunction } from 'react';

export interface Props {
  value: any;
}

/**
 * 组件名称
 */
const HiddenInput: ForwardRefRenderFunction<any, Props> = ({ value }, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      value,
    }),
    [value],
  );

  return null;
};

HiddenInput.displayName = 'HiddenInput';

export default forwardRef(HiddenInput);
