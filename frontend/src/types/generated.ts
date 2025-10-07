/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AIResponse {
  /**
   * Form id
   * @format uuid
   */
  form_id: string;
}

export interface Response {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Form
   * @format uuid
   */
  form: string;
  /**
   * Hospital
   * @format uuid
   */
  hospital: string;
  /**
   * Patient
   * @format uuid
   */
  patient: string;
  /**
   * Ai response text
   * @minLength 1
   */
  ai_response_text: string;
  /**
   * Updated response
   * @minLength 1
   */
  updated_response: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 20
   */
  status?: string;
}

export interface Form {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Hospital
   * @format uuid
   */
  hospital: string;
  /**
   * Patient
   * @format uuid
   */
  patient: string;
  /** Medical history */
  medical_history: object;
  /** Response */
  response?: string | null;
  /** Status */
  status?: "green" | "yellow" | "red";
}

export interface FormCreate {
  /**
   * Hospital id
   * @format uuid
   */
  hospital_id: string;
  /**
   * Patient id
   * @format uuid
   */
  patient_id: string;
  /** Medical history */
  medical_history: object;
}

export interface Input {
  /** Medical history */
  medical_history: object;
}

export interface HospitalCreate {
  /**
   * Name
   * @minLength 1
   */
  name: string;
}

export interface HospitalUpdate {
  /**
   * Name
   * @minLength 1
   */
  name: string;
}

export interface Patient {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Hospital
   * @format uuid
   */
  hospital: string;
  /**
   * First name
   * @minLength 1
   * @maxLength 100
   */
  first_name: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 100
   */
  last_name: string;
  /**
   * Dob
   * @format date
   */
  dob: string;
  /** Sex */
  sex: "M" | "F" | "O";
  /**
   * Phone
   * @maxLength 20
   */
  phone?: string | null;
  /**
   * Email
   * @format email
   * @maxLength 254
   */
  email?: string | null;
}

export interface PatientCreate {
  /**
   * First name
   * @minLength 1
   */
  first_name: string;
  /**
   * Last name
   * @minLength 1
   */
  last_name: string;
  /**
   * Dob
   * @format date
   */
  dob: string;
  /** Sex */
  sex: "M" | "F" | "O";
  /**
   * Phone
   * @minLength 1
   */
  phone: string;
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * Hospital id
   * @format uuid
   */
  hospital_id: string;
}

export interface PatientUpdate {
  /**
   * First name
   * @minLength 1
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   */
  last_name?: string;
  /**
   * Dob
   * @format date
   */
  dob?: string;
  /** Sex */
  sex?: "M" | "F" | "O";
  /**
   * Phone
   * @minLength 1
   */
  phone?: string;
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email?: string;
}

export interface ResponseUpdate {
  /**
   * Updated response
   * @minLength 1
   */
  updated_response?: string;
  /**
   * Status
   * @minLength 1
   */
  status?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title PreOpAI API
 * @version v1
 * @baseUrl http://localhost:8000
 *
 * API documentation for PreOpAI
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  ai = {
    /**
     * No description
     *
     * @tags ai
     * @name AiGenerateCreate
     * @request POST:/ai/generate/
     * @secure
     */
    aiGenerateCreate: (data: AIResponse, params: RequestParams = {}) =>
      this.request<Response, any>({
        path: `/ai/generate/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  forms = {
    /**
     * No description
     *
     * @tags forms
     * @name FormsList
     * @request GET:/forms/
     * @secure
     */
    formsList: (params: RequestParams = {}) =>
      this.request<Form[], any>({
        path: `/forms/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags forms
     * @name FormsCreateCreate
     * @request POST:/forms/create/
     * @secure
     */
    formsCreateCreate: (data: FormCreate, params: RequestParams = {}) =>
      this.request<Form, any>({
        path: `/forms/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags forms
     * @name FormsFormExportList
     * @request GET:/forms/form/{id}/export/
     * @secure
     */
    formsFormExportList: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/forms/form/${id}/export/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags forms
     * @name FormsRead
     * @request GET:/forms/{id}/
     * @secure
     */
    formsRead: (id: string, params: RequestParams = {}) =>
      this.request<Form, any>({
        path: `/forms/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags forms
     * @name FormsUpdateCreate
     * @request POST:/forms/{id}/update/
     * @secure
     */
    formsUpdateCreate: (id: string, data: Input, params: RequestParams = {}) =>
      this.request<Form, any>({
        path: `/forms/${id}/update/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  hospitals = {
    /**
     * No description
     *
     * @tags hospitals
     * @name HospitalsList
     * @request GET:/hospitals/
     * @secure
     */
    hospitalsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/hospitals/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags hospitals
     * @name HospitalsCreateCreate
     * @request POST:/hospitals/create/
     * @secure
     */
    hospitalsCreateCreate: (data: HospitalCreate, params: RequestParams = {}) =>
      this.request<HospitalCreate, any>({
        path: `/hospitals/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags hospitals
     * @name HospitalsRead
     * @request GET:/hospitals/{id}/
     * @secure
     */
    hospitalsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/hospitals/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags hospitals
     * @name HospitalsUpdateCreate
     * @request POST:/hospitals/{id}/update/
     * @secure
     */
    hospitalsUpdateCreate: (
      id: string,
      data: HospitalUpdate,
      params: RequestParams = {},
    ) =>
      this.request<HospitalUpdate, any>({
        path: `/hospitals/${id}/update/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  patients = {
    /**
     * No description
     *
     * @tags patients
     * @name PatientsList
     * @request GET:/patients/
     * @secure
     */
    patientsList: (params: RequestParams = {}) =>
      this.request<Patient[], any>({
        path: `/patients/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags patients
     * @name PatientsCreateCreate
     * @request POST:/patients/create/
     * @secure
     */
    patientsCreateCreate: (data: PatientCreate, params: RequestParams = {}) =>
      this.request<PatientCreate, any>({
        path: `/patients/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags patients
     * @name PatientsRead
     * @request GET:/patients/{id}/
     * @secure
     */
    patientsRead: (id: string, params: RequestParams = {}) =>
      this.request<Patient, any>({
        path: `/patients/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags patients
     * @name PatientsUpdateCreate
     * @request POST:/patients/{id}/update/
     * @secure
     */
    patientsUpdateCreate: (
      id: string,
      data: PatientUpdate,
      params: RequestParams = {},
    ) =>
      this.request<PatientUpdate, any>({
        path: `/patients/${id}/update/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  responses = {
    /**
     * No description
     *
     * @tags responses
     * @name ResponsesList
     * @request GET:/responses/
     * @secure
     */
    responsesList: (params: RequestParams = {}) =>
      this.request<Response[], any>({
        path: `/responses/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesRead
     * @request GET:/responses/{id}/
     * @secure
     */
    responsesRead: (id: string, params: RequestParams = {}) =>
      this.request<Response, any>({
        path: `/responses/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags responses
     * @name ResponsesUpdateCreate
     * @request POST:/responses/{id}/update/
     * @secure
     */
    responsesUpdateCreate: (
      id: string,
      data: ResponseUpdate,
      params: RequestParams = {},
    ) =>
      this.request<Response, any>({
        path: `/responses/${id}/update/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
