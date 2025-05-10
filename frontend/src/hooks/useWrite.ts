import { useQueryClient } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";

/**
 * @description 处理合约的写入操作。
 * @returns writeContract 读取合约的函数
 * @returns isPending 是否处于挂起状态
 * @returns isSuccess 是否成功
 * @returns error 错误信息
 */
function useWrite() {
  const queryClient = useQueryClient();

  const { writeContract, isPending, isSuccess, error } = useWriteContract({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["readContract"],
          exact: false,
        });
      },
    },
  });

  return {
    writeContract,
    isPending,
    isSuccess,
    error,
  };
}

export default useWrite;
