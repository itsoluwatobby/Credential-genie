import { useState } from 'react';
import  protocolDefinition from '../utils/protocolDefinition.json';
import { useEffect } from 'react';


export const useFetchCredentials = ({web5Obj}) => {
  const [credentials, setCredentials] = useState({
    isLoading: false,
    error: '',
    vcs: [],
  });

  useEffect(() => {
    let isMounted = true
    const fetchCredentials = async () => {
      setCredentials((prev) => ({ ...prev, isLoading: true }));
      try {
        const { records } = await web5Obj.web5.dwn.records.query({
          message: {
            schema: protocolDefinition.types.vc.schema,
            filter: {
              protocol: protocolDefinition.protocol,
            },
          },
        });
        if (!records?.length) throw new Error('No credentials');
        await Promise.all(
          records?.map(async (record) => {
            const rec = await record.data.json();
            setCredentials((prev) => ({
              ...prev,
              vcs: [
                ...prev.vcs,
                {
                  ...rec,
                  id: record?.id,
                  // date: record?.descriptor?.dateCreated
                },
              ],
            }));
          })
        );
      } catch (error) {
        setCredentials((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      } finally {
        setCredentials((prev) => ({ ...prev, isLoading: false }));
      }
    };
    isMounted ? fetchCredentials() : null;
    return () => {
      isMounted = false;
    };
  }, [web5Obj.web5]);

  return { credentials }
}