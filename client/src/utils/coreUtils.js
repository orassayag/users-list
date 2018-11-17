export const getEnvironment = () => {
    return process.env.NODE_ENV || 'development';
};

export const updateObject = (oldObject, updatedProperties) => {
    if (!oldObject || !updatedProperties) {
        return null;
    }

    return {
        ...oldObject,
        ...updatedProperties
    };
};